import { NextRequest, NextResponse } from 'next/server';

import VacancyModel from '@/database/models/Vacancy';
import mongooseConnect from '@/database/mongooseConnect';

export const dynamic = 'force-dynamic';

// GET - List all vacancies
export async function GET(request: NextRequest) {
  try {
    await mongooseConnect();
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    const isSavedParam = searchParams.get('isSaved');
    const page = pageParam ? Number(pageParam) : 1;
    const limit = limitParam ? Number(limitParam) : 10;

    const vacancies = await VacancyModel.find({ isSaved: isSavedParam === 'true' })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    return NextResponse.json(vacancies);
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    return NextResponse.json({ error: 'Failed to fetch vacancies' }, { status: 500 });
  }
}

// POST - Create a new vacancy
export async function POST(request: NextRequest) {
  try {
    await mongooseConnect();
    const body = await request.json();

    const vacancy = new VacancyModel(body);
    await vacancy.save();

    return NextResponse.json(vacancy, { status: 201 });
  } catch (error) {
    console.error('Error creating vacancy:', error);
    return NextResponse.json({ error: 'Failed to create vacancy' }, { status: 500 });
  }
}
