import VacancyModel from '@/database/models/Vacancy';
import mongooseConnect from '@/database/mongooseConnect';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET - List all vacancies
export async function GET(request: NextRequest) {
  try {
    await mongooseConnect();
    const { searchParams } = new URL(request.url);
    const isSaved = searchParams.get('isSaved');
    const limitParam = searchParams.get('limit');

    const query: Record<string, unknown> = {};
    if (isSaved !== null) {
      query.isSaved = isSaved === 'true';
    }

    let findQuery = VacancyModel.find(query).sort({ createdAt: -1 });
    if (limitParam) {
      const limit = Number(limitParam);
      if (!Number.isNaN(limit) && limit > 0) {
        findQuery = findQuery.limit(Math.min(limit, 50));
      }
    }

    const vacancies = await findQuery;
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
