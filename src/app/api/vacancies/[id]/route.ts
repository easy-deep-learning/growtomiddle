import { NextRequest, NextResponse } from 'next/server';

import { deleteById, getById, updateById } from '@/controllers/VacancyController';

export const dynamic = 'force-dynamic';

// GET - Get a single vacancy by ID
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const vacancy = await getById(id);
    return NextResponse.json(vacancy);
  } catch (error) {
    console.error('Error fetching vacancy:', error);
    return NextResponse.json({ error: 'Failed to fetch vacancy' }, { status: 500 });
  }
}

// PUT - Update a vacancy
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();

    const { id } = await context.params;
    const vacancy = await updateById(id, body);

    if (!vacancy) {
      return NextResponse.json({ error: 'Vacancy not found' }, { status: 404 });
    }

    return NextResponse.json(vacancy);
  } catch (error) {
    console.error('Error updating vacancy:', error);
    return NextResponse.json({ error: 'Failed to update vacancy' }, { status: 500 });
  }
}

// DELETE - Delete a vacancy
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const vacancy = await deleteById(id);
    return NextResponse.json(vacancy);
  } catch (error) {
    console.error('Error deleting vacancy:', error);
    return NextResponse.json({ error: 'Failed to delete vacancy' }, { status: 500 });
  }
}
