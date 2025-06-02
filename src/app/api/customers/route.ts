import { NextRequest, NextResponse } from 'next/server'
import { CustomerStorage } from '@/lib/customerStorage'
import { addCustomerSchema } from '@/lib/validations'

// GET /api/customers - Get all customers or search customers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const status = searchParams.get('status') as 'active' | 'inactive' | 'vip' | null

    let customers

    if (query) {
      customers = await CustomerStorage.searchCustomers(query)
    } else if (status) {
      customers = await CustomerStorage.getCustomersByStatus(status)
    } else {
      customers = await CustomerStorage.getAllCustomers()
    }

    return NextResponse.json({
      customers,
      count: customers.length
    }, { status: 200 })

  } catch (error) {
    console.error('Get customers error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/customers - Create a new customer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = addCustomerSchema.parse(body)
    
    // Check if customer already exists
    const existingCustomer = await CustomerStorage.findCustomerByEmail(validatedData.email)
    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Customer with this email already exists' },
        { status: 400 }
      )
    }
    
    // Create new customer
    const customer = await CustomerStorage.createCustomer(
      validatedData.name,
      validatedData.email,
      validatedData.phone,
      validatedData.address,
      validatedData.status,
      validatedData.notes
    )
    
    return NextResponse.json(
      { 
        message: 'Customer created successfully',
        customer
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Create customer error:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/customers - Update a customer (for future use)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      )
    }
    
    // Validate updates (partial validation)
    const validatedUpdates = addCustomerSchema.partial().parse(updates)
    
    // Check if email is being updated and already exists
    if (validatedUpdates.email) {
      const existingCustomer = await CustomerStorage.findCustomerByEmail(validatedUpdates.email)
      if (existingCustomer && existingCustomer.id !== id) {
        return NextResponse.json(
          { error: 'Customer with this email already exists' },
          { status: 400 }
        )
      }
    }
    
    const updatedCustomer = await CustomerStorage.updateCustomer(id, validatedUpdates)
    
    if (!updatedCustomer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { 
        message: 'Customer updated successfully',
        customer: updatedCustomer
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Update customer error:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/customers - Delete a customer (for future use)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      )
    }
    
    const deleted = await CustomerStorage.deleteCustomer(id)
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { message: 'Customer deleted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Delete customer error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
