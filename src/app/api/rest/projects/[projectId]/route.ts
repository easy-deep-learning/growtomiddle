import { NextRequest, NextResponse } from 'next/server'
import mongooseConnect from '@/database/mongooseConnect'
import ProjectModel from '@/database/models/Project'
import { getUserFromRequest } from '@/utils/getUserFromRequest'
import { isAuthorized } from '@/utils/isAuthorized'
import { Action, ResourceName } from '@/database/types/Role'

export const GET = async (request: NextRequest, props: { params: Promise<{ projectId: string }> }) => {
  const params = await props.params;
  try {
    const user = await getUserFromRequest(request)

    await mongooseConnect()
    const project = await ProjectModel.findById(params.projectId).populate(
      'author'
    )

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found', user },
        { status: 404 }
      )
    }

    if (
      !isAuthorized({
        user,
        resourceName: ResourceName.project,
        resourceAuthorId: project?.authorId,
        action: Action.read,
      })
    ) {
      return NextResponse.json(
        { error: 'Not authorized', user },
        { status: 403 }
      )
    }

    return NextResponse.json({ data: project, user }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
