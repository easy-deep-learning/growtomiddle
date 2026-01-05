import { NextRequest, NextResponse } from 'next/server';

import mongooseConnect from '@/database/mongooseConnect';
import { create as createVacancy, getAll } from '@/controllers/VacancyController';

export const dynamic = 'force-dynamic';

// GET - List all vacancies
export async function GET(request: NextRequest) {
  try {
    await mongooseConnect();
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    const page = pageParam ? Number(pageParam) : 1;
    const limit = limitParam ? Number(limitParam) : 10;

    const vacancies = await getAll({ page, limit });
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

    const vacancy = await createVacancy(body);

    return NextResponse.json(vacancy, { status: 201 });
  } catch (error) {
    console.error('Error creating vacancy:', error);
    return NextResponse.json({ error: 'Failed to create vacancy' }, { status: 500 });
  }
}
