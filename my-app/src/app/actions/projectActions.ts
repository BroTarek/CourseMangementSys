'use server'

import axios from 'axios'

// Define the shape of the project data
type ProjectData = {
    projectName: string
    projectDescription: string
    startDate: Date
    endDate: Date
    department: string
    members: Array<{ Name: string; Role: string }>
    leaders: Array<{ Name: string; Role: string }>
    selectedProjects: Array<any>
    totalMarks: number
    followUpPeriod: string
    projectReferences: string
}

type ActionState = {
    success?: boolean
    message?: string
    error?: string
    projectId?: string
}

export async function createProject(
    prevState: ActionState | null,
    formData: FormData
): Promise<ActionState> {
    try {
        // Extract project data from FormData
        const projectDataStr = formData.get('projectData') as string

        if (!projectDataStr) {
            return {
                success: false,
                error: 'No project data provided'
            }
        }

        const projectData: ProjectData = JSON.parse(projectDataStr)

        // Prepare data for backend (transform if needed)
        const backendPayload = {
            name: projectData.projectName,
            description: projectData.projectDescription,
            startDate: projectData.startDate,
            endDate: projectData.endDate,
            department: projectData.department,
            members: projectData.members,
            leaders: projectData.leaders,
            tasks: projectData.selectedProjects,
            totalMarks: projectData.totalMarks,
            followUpPeriod: projectData.followUpPeriod,
            references: projectData.projectReferences,
            submittedAt: new Date().toISOString()
        }

        console.log('📤 Sending data to backend:', backendPayload)

        // Make request to your backend using axios
        // Replace with your actual backend URL
        const response = await axios.post(
            process.env.BACKEND_API_URL + '/api/projects',
            backendPayload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Add auth token if needed
                    'Authorization': `Bearer ${process.env.API_TOKEN}`,
                },
                timeout: 10000, // 10 second timeout
            }
        )

        console.log('✅ Backend response:', response.data)

        return {
            success: true,
            message: 'Project created successfully!',
            projectId: response.data.id || response.data.projectId
        }

    } catch (error) {
        console.error('❌ Error creating project:', error)

        // Handle axios errors
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Server responded with error status
                return {
                    success: false,
                    error: `Backend error: ${error.response.data?.message || error.response.statusText}`
                }
            } else if (error.request) {
                // Request made but no response
                return {
                    success: false,
                    error: 'No response from backend server. Please check your connection.'
                }
            }
        }

        // Generic error
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create project'
        }
    }
}
