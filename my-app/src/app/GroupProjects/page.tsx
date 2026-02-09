'use client'
import { useActionState, startTransition } from 'react'
import ProjectInitializationForm from './GroupProjectComponents/(compoenets)/Forms/ProjectInitializationForm'
import FormWrapper from './GroupProjectComponents/(compoenets)/Forms/FormWrapper'
import ProjectSpecificationForm from './GroupProjectComponents/(compoenets)/Forms/ProjectSpecificationForm'
import MembersSelectionForm from './GroupProjectComponents/(compoenets)/Forms/MembersSelectionForm'
import ProjectSelectionForm from './GroupProjectComponents/(compoenets)/Forms/ProjectSelectionForm'
import useMultiStepForm from '../../hooks/useMultiStepForm'
import { FormProvider, useForm } from 'react-hook-form'
import { createProject } from '../actions/projectActions'

const Page = () => {
  const { CurrentIndex, Next, Previous, currentForm, totalSteps } =
    useMultiStepForm([
      <ProjectInitializationForm key={1} />,
      <MembersSelectionForm key={0} />,
      <ProjectSelectionForm key={2} />,
      <ProjectSpecificationForm key={3} />
    ])

  const Methods = useForm()

  // useActionState hook - provides state, action function, and loading state
  const [state, formAction, isPending] = useActionState(createProject, null)

  // Step configuration for animated timeline
  const stepConfig = [
    { label: 'Project Initialization', icon: 'clipboard' as const },
    { label: 'Select Members', icon: 'users' as const },
    { label: 'Select Projects', icon: 'folder' as const },
    { label: 'Specifications', icon: 'file' as const }
  ]

  // Handle Next/Complete button logic
  const handleNext = async () => {
    if (CurrentIndex === totalSteps - 1) {
      // On last step, validate and submit
      const isValid = await Methods.trigger() // Validate all fields

      if (isValid) {
        // Get all form data
        const data = Methods.getValues()

        console.log('📋 Form data being submitted:', data)

        // Convert to FormData for Server Action
        const formData = new FormData()
        formData.append('projectData', JSON.stringify(data))

        // Call server action inside startTransition (required for useActionState)
        startTransition(() => {
          formAction(formData)
        })
      } else {
        alert('Please fill in all required fields')
      }
    } else {
      Next()
    }
  }

  return (
    <>
      <FormProvider {...Methods}>
        {/* Success Message */}
        {state?.success && (
          <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
            <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold">{state.message}</p>
                {state.projectId && (
                  <p className="text-sm text-green-600">Project ID: {state.projectId}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {state?.error && (
          <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
            <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold">Error</p>
                <p className="text-sm">{state.error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isPending && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">Creating Project...</p>
                <p className="text-sm text-gray-500 mt-1">Please wait while we save your data</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          <FormWrapper
            Next={handleNext}
            Previous={Previous}
            CurrentIndex={CurrentIndex}
            totalSteps={totalSteps}
            steps={stepConfig}
          >
            {currentForm}
          </FormWrapper>
        </form>
      </FormProvider>
    </>
  )
}

export default Page