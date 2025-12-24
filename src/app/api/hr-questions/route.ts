import { NextRequest, NextResponse } from 'next/server';

import HrQuestionModel from '@/database/models/HrQuestion';
import mongooseConnect from '@/database/mongooseConnect';

export const dynamic = 'force-dynamic';

// GET - List all HrQuestions
export async function GET(request: NextRequest) {
  try {
    await mongooseConnect();
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    const page = pageParam ? Number(pageParam) : 1;
    const limit = limitParam ? Number(limitParam) : 10;

    const HrQuestions = await HrQuestionModel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    return NextResponse.json(HrQuestions);
  } catch (error) {
    console.error('Error fetching HrQuestions:', error);
    return NextResponse.json({ error: 'Failed to fetch hr-questions' }, { status: 500 });
  }
}

// POST - Create a new HrQuestion
export async function POST(request: NextRequest) {
  try {
    await mongooseConnect();
    const body = await request.json();

    const HrQuestion = new HrQuestionModel(body);
    await HrQuestion.save();

    return NextResponse.json(HrQuestion, { status: 201 });
  } catch (error) {
    console.error('Error creating HrQuestion:', error);
    return NextResponse.json({ error: 'Failed to create HrQuestion' }, { status: 500 });
  }
}

