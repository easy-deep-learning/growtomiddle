import { NextRequest, NextResponse } from 'next/server';

import HrQuestionModel from '@/database/models/HrQuestion';
import mongooseConnect from '@/database/mongooseConnect';

export const dynamic = 'force-dynamic';

// GET - Get a single HrQuestion by ID
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await mongooseConnect();
    const { id } = await context.params;
    const HrQuestion = await HrQuestionModel.findById(id);

    if (!HrQuestion) {
      return NextResponse.json({ error: 'HrQuestion not found' }, { status: 404 });
    }

    return NextResponse.json(HrQuestion);
  } catch (error) {
    console.error('Error fetching HrQuestion:', error);
    return NextResponse.json({ error: 'Failed to fetch HrQuestion' }, { status: 500 });
  }
}

// PUT - Update a HrQuestion
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await mongooseConnect();
    const body = await request.json();

    const { id } = await context.params;
    const HrQuestion = await HrQuestionModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!HrQuestion) {
      return NextResponse.json({ error: 'HrQuestion not found' }, { status: 404 });
    }

    return NextResponse.json(HrQuestion);
  } catch (error) {
    console.error('Error updating HrQuestion:', error);
    return NextResponse.json({ error: 'Failed to update HrQuestion' }, { status: 500 });
  }
}

// DELETE - Delete a HrQuestion
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await mongooseConnect();
    const { id } = await context.params;
    const HrQuestion = await HrQuestionModel.findByIdAndDelete(id);

    if (!HrQuestion) {
      return NextResponse.json({ error: 'HrQuestion not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'HrQuestion deleted successfully' });
  } catch (error) {
    console.error('Error deleting HrQuestion:', error);
    return NextResponse.json({ error: 'Failed to delete HrQuestion' }, { status: 500 });
  }
}

