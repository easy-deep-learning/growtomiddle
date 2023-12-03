'use client'

import { NextPage } from 'next'
import { FormEvent } from 'react'

import { gql, useMutation } from '@apollo/client'

const query = gql`
    #graphql
    mutation CreateProject($project: ProjectInput) {
        createProject(project: $project) {
            name
            description
        }
    }
`

const ProjectNewPage: NextPage = () => {
  const [createProject] = useMutation(query)


  const handleCreateProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const body = Object.fromEntries(formData)
    const response = await createProject({ variables: { project: body } })
    console.log("response: ", response); // eslint-disable-line
  }


  return (
    <div>
      <h1>Create a new project</h1>
      <form action="/projects" method="POST" onSubmit={handleCreateProject}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" required />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default ProjectNewPage;
