import { NextRequest, NextResponse } from 'next/server'
import ProjectModel from '@/database/models/Project'
import { Action, ResourceName } from '@/database/types/Role'
import mongooseConnect from '@/database/mongooseConnect'
import { isAuthorized } from '@/utils/isAuthorized'
import { getUserFromRequest } from '@/utils/getUserFromRequest'
import { IProjectDocument } from '@/database/types/Project'
import { IUserWithRole } from '@/database/types/User'

export const GET = async (request: NextRequest) => {
  try {
    const user: IUserWithRole | null = await getUserFromRequest(request)
    if (
      !isAuthorized({
        user,
        resourceName: ResourceName.project,
        action: Action.read,
      })
    ) {
      return NextResponse.json(
        { error: 'Not authorized', user },
        { status: 403 }
      )
    }
    await mongooseConnect()
    const projects: IProjectDocument[] = await ProjectModel.find({}).populate(
      'author'
    )
    return NextResponse.json({ data: projects, user }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// POST /api/projects
// create a new project
export const POST = async (request: NextRequest) => {
  try {
    const user = await getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }

    if (
      !isAuthorized({
        user,
        resourceName: ResourceName.project,
        action: Action.create,
      })
    ) {
      return NextResponse.json(
        { error: 'Not authorized', user },
        { status: 403 }
      )
    }

    await mongooseConnect()
    const { name, description, url } = await request.json()
    const project = await ProjectModel.create({
      name,
      description,
      url,
      authorId: user._id,
    })
    project.save()
    const createdProject = await ProjectModel.findById(project._id)
    return NextResponse.json({ data: createdProject, user }, { status: 201 })
  } catch (error: any) {
    let errorMessage = 'Internal Server Error'
    let statusCode = 500
    if (error.code === 11000) {
      errorMessage = 'Project already exists'
      statusCode = 409
    }
    return NextResponse.json({ error: errorMessage }, { status: statusCode })
  }
}
