import { Link } from 'react-router-dom'
import { 
  CalendarDaysIcon, 
  ClockIcon, 
  UserGroupIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline'

export function Home() {
  const features = [
    {
      icon: CalendarDaysIcon,
      title: 'Smart Scheduling',
      description: 'AI-powered time slot suggestions and conflict resolution for seamless booking.'
    },
    {
      icon: UserGroupIcon,
      title: 'Event Management',
      description: 'Create, manage, and track events with registration capabilities.'
    },
    {
      icon: ClockIcon,
      title: 'Calendar Sync',
      description: 'Two-way synchronization with Google Calendar and other providers.'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics',
      description: 'Track bookings, attendance, and engagement with detailed insights.'
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart Scheduling
              <span className="text-primary-600"> Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The open-source platform that combines the best of Calendly, Eventbrite, 
              and hackathon tools into one powerful scheduling solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-primary text-lg px-8 py-3">
                Get Started Free
              </Link>
              <Link to="/demo" className="btn-secondary text-lg px-8 py-3">
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to manage schedules
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From simple appointments to complex events, Schedlyx handles it all 
              with intelligent automation and seamless integrations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-lg mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to streamline your scheduling?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of users who trust Schedlyx for their scheduling needs.
          </p>
          <Link to="/signup" className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Start Free Today
          </Link>
        </div>
      </div>
    </div>
  )
}