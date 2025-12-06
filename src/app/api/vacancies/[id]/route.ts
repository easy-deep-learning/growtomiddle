import { NextRequest, NextResponse } from 'next/server';

import VacancyModel from '@/database/models/Vacancy';
import mongooseConnect from '@/database/mongooseConnect';

export const dynamic = 'force-dynamic';

// GET - Get a single vacancy by ID
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await mongooseConnect();
    const { id } = await context.params;
    const vacancy = await VacancyModel.findById(id);

    if (!vacancy) {
      return NextResponse.json({ error: 'Vacancy not found' }, { status: 404 });
    }

    return NextResponse.json(vacancy);
  } catch (error) {
    console.error('Error fetching vacancy:', error);
    return NextResponse.json({ error: 'Failed to fetch vacancy' }, { status: 500 });
  }
}

// PUT - Update a vacancy
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await mongooseConnect();
    const body = await request.json();

    const { id } = await context.params;
    const vacancy = await VacancyModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

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
    await mongooseConnect();
    const { id } = await context.params;
    const vacancy = await VacancyModel.findByIdAndDelete(id);

    if (!vacancy) {
      return NextResponse.json({ error: 'Vacancy not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Vacancy deleted successfully' });
  } catch (error) {
    console.error('Error deleting vacancy:', error);
    return NextResponse.json({ error: 'Failed to delete vacancy' }, { status: 500 });
  }
}
