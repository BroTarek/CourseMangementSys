import { ReactElement } from "react"
import { useFormContext } from "react-hook-form"

interface StepConfig {
  label: string
  icon: 'clipboard' | 'users' | 'folder' | 'file'
}

interface FormWrapperProps {
  children: ReactElement | ReactElement[]
  Next: () => void
  Previous: () => void
  CurrentIndex: number
  totalSteps?: number
  title?: string
  description?: string
  steps?: StepConfig[]
}

const FormWrapper = ({
  children,
  Next,
  Previous,
  CurrentIndex,
  totalSteps = 1,
  title,
  description,
  steps = []
}: FormWrapperProps) => {
  const { control } = useFormContext()

  // Helper function to render icons
  const renderIcon = (iconType: string) => {
    const iconClass = "w-6 h-6"
    switch (iconType) {
      case 'clipboard':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        )
      case 'users':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )
      case 'folder':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        )
      case 'file':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      default:
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with animated timeline */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                {title && (
                  <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                )}
                {description && (
                  <p className="mt-1 text-sm text-gray-600">{description}</p>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Step {CurrentIndex + 1} of {totalSteps}
              </div>
            </div>

            {/* Animated Timeline */}
            <div className="relative">
              <div className="flex items-center justify-between">
                {steps.length > 0 && steps.map((step, index) => {
                  const isCompleted = index < CurrentIndex
                  const isActive = index === CurrentIndex
                  const isUpcoming = index > CurrentIndex

                  return (
                    <div key={index} className="flex items-center" style={{ flex: index < steps.length - 1 ? 1 : 'none' }}>
                      {/* Step node */}
                      <div className="flex flex-col items-center relative z-10">
                        {/* Icon circle */}
                        <div className={`
                          relative flex items-center justify-center w-14 h-14 rounded-full border-4 transition-all duration-500 ease-in-out
                          ${isCompleted ? 'bg-green-500 border-green-500 scale-100' : ''}
                          ${isActive ? 'bg-blue-600 border-blue-600 scale-110 shadow-lg shadow-blue-300 animate-pulse' : ''}
                          ${isUpcoming ? 'bg-white border-gray-300 scale-100' : ''}
                        `}>
                          <div className={`
                            transition-all duration-300
                            ${isCompleted ? 'text-white' : ''}
                            ${isActive ? 'text-white' : ''}
                            ${isUpcoming ? 'text-gray-400' : ''}
                          `}>
                            {isCompleted ? (
                              <svg className="w-8 h-8 animate-[scale-in_0.3s_ease-out]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              renderIcon(step.icon)
                            )}
                          </div>
                        </div>

                        {/* Step label */}
                        <span className={`
                          mt-3 text-xs font-medium text-center whitespace-nowrap transition-all duration-300
                          ${isCompleted ? 'text-green-600' : ''}
                          ${isActive ? 'text-blue-600 font-semibold' : ''}
                          ${isUpcoming ? 'text-gray-400' : ''}
                        `}>
                          {step.label}
                        </span>
                      </div>

                      {/* Connection line */}
                      {index < steps.length - 1 && (
                        <div className="flex-1 h-1 mx-2 relative" style={{ marginTop: '-2.5rem' }}>
                          {/* Background line */}
                          <div className="absolute inset-0 bg-gray-300 rounded-full" />
                          {/* Animated filled line */}
                          <div
                            className={`
                              absolute inset-0 rounded-full transition-all duration-500 ease-in-out
                              ${index < CurrentIndex ? 'bg-green-500 w-full' : 'bg-blue-600 w-0'}
                            `}
                            style={{
                              width: index < CurrentIndex ? '100%' : (index === CurrentIndex ? '50%' : '0%')
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Form content */}
            <div className="p-6 md:p-8">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Footer with navigation */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <button
              onClick={Previous}
              className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={CurrentIndex === 0}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <button
              onClick={Next}
              className="px-8 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              {CurrentIndex === totalSteps - 1 ? 'Complete' : 'Next Step'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default FormWrapper