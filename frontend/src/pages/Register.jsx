import React, { useState } from 'react'
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  Wrench, 
  Compass, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Pencil,
  ExternalLink,
  ArrowRight,
  RotateCcw
} from 'lucide-react'
import './Register.css'

export default function Register({ onNavigateToLogin }) {
  // Step navigation (1: Basic, 2: Education, 3: Experience, 4: Projects, 5: Skills, 6: Preferences, 7: Preview, 8: Done)
  const [currentStep, setCurrentStep] = useState(1)
  const [hasExperience, setHasExperience] = useState(null) // null | true | false
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Track if user jumped to a step from the preview section to edit
  const [isEditingFromPreview, setIsEditingFromPreview] = useState(false)

  // Section A: Basic Personal and Professional Information
  const [basicInfo, setBasicInfo] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    state: '',
    country: 'India',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    otherLinks: ''
  })

  // Section B: Educational Information
  const [education, setEducation] = useState({
    degree: '',
    specialization: '',
    collegeName: '',
    graduationYear: '',
    cgpaOrPercentage: '',
    academicHistory: ''
  })

  // Section C: Internship and Work Experience (Array of items)
  const [experiences, setExperiences] = useState([
    {
      company: '',
      role: '',
      domain: '',
      duration: '',
      responsibilities: '',
      technologies: '',
      contributions: ''
    }
  ])

  // Section D: Detailed Project Information (Array of items)
  const [projects, setProjects] = useState([
    {
      title: '',
      description: '',
      problemSolved: '',
      languages: '',
      frameworks: '',
      database: '',
      integrations: '',
      contributions: '',
      features: '',
      githubOrLiveLink: ''
    }
  ])

  // Section E: Technical Skills
  const [skills, setSkills] = useState({
    languages: '',
    frameworks: '',
    databases: '',
    cloudTools: '',
    devTools: '',
    domainKnowledge: ''
  })

  // Section F: Career Preferences
  const [preferences, setPreferences] = useState({
    jobRoles: '',
    targetDomains: '',
    preferredLocations: '',
    workMode: 'Hybrid', // Remote | Hybrid | On-site | Any
    employmentType: 'Full-time' // Full-time | Internship | Both
  })

  // Handlers for Basic Info
  const handleBasicChange = (field, value) => {
    setBasicInfo(prev => ({ ...prev, [field]: value }))
  }

  // Handlers for Education
  const handleEduChange = (field, value) => {
    setEducation(prev => ({ ...prev, [field]: value }))
  }

  // Handlers for Experience items
  const handleExperienceChange = (index, field, value) => {
    setExperiences(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const addExperience = () => {
    setExperiences(prev => [
      ...prev,
      {
        company: '',
        role: '',
        domain: '',
        duration: '',
        responsibilities: '',
        technologies: '',
        contributions: ''
      }
    ])
  }

  const removeExperience = (index) => {
    setExperiences(prev => prev.filter((_, i) => i !== index))
  }

  // Handlers for Project items
  const handleProjectChange = (index, field, value) => {
    setProjects(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const addProject = () => {
    setProjects(prev => [
      ...prev,
      {
        title: '',
        description: '',
        problemSolved: '',
        languages: '',
        frameworks: '',
        database: '',
        integrations: '',
        contributions: '',
        features: '',
        githubOrLiveLink: ''
      }
    ])
  }

  const removeProject = (index) => {
    setProjects(prev => prev.filter((_, i) => i !== index))
  }

  // Handlers for Skills
  const handleSkillChange = (field, value) => {
    setSkills(prev => ({ ...prev, [field]: value }))
  }

  // Handlers for Preferences
  const handlePrefChange = (field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }))
  }

  // Step Validation & Navigation
  const validateCurrentStep = () => {
    setError('')
    if (currentStep === 1) {
      if (!basicInfo.fullName.trim() || !basicInfo.email.trim() || !basicInfo.password.trim() || !basicInfo.phone.trim()) {
        setError('Please complete the required fields: Full Name, Email, Password, and Phone Number.')
        return false
      }
      if (basicInfo.password.length < 6) {
        setError('Password should be at least 6 characters.')
        return false
      }
    } else if (currentStep === 2) {
      if (!education.degree.trim() || !education.collegeName.trim() || !education.graduationYear.trim()) {
        setError('Please fill in your Degree, College/University, and Graduation Year.')
        return false
      }
    } else if (currentStep === 3) {
      if (hasExperience === null) {
        setError('Please specify whether you have any work or internship experience.')
        return false
      }
      if (hasExperience === true) {
        const hasValidExp = experiences.some(exp => exp.company.trim() && exp.role.trim())
        if (!hasValidExp) {
          setError('Please provide at least one organization and role, or choose "No experience".')
          return false
        }
      }
    } else if (currentStep === 4) {
      const hasValidProj = projects.some(p => p.title.trim() && (p.description.trim() || p.languages.trim() || p.problemSolved.trim()))
      if (!hasValidProj) {
        setError('Please add at least one project with a title and brief description/tech stack.')
        return false
      }
    } else if (currentStep === 5) {
      if (!skills.languages.trim() && !skills.frameworks.trim()) {
        setError('Please specify at least one programming language or framework you are familiar with.')
        return false
      }
    } else if (currentStep === 6) {
      if (!preferences.jobRoles.trim()) {
        setError('Please list at least one preferred job role (e.g. Frontend Developer, Java Developer).')
        return false
      }
    }
    return true
  }

  const handleNext = () => {
    if (!validateCurrentStep()) return
    setCurrentStep(prev => prev + 1)
  }

  const handlePrev = () => {
    setError('')
    setCurrentStep(prev => Math.max(1, prev - 1))
  }

  // Jump to specific step for editing from preview
  const handleEditSection = (stepNumber) => {
    setError('')
    setIsEditingFromPreview(true)
    setCurrentStep(stepNumber)
  }

  // Return to preview after editing
  const handleReturnToPreview = () => {
    if (!validateCurrentStep()) return
    setIsEditingFromPreview(false)
    setCurrentStep(7)
  }

  // Final submission from Step 7 (Preview)
  const handleFinalSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setCurrentStep(8) // Success screen
    }, 1000)
  }

  // Stepper indicator definitions
  const stepsList = [
    { num: 1, label: 'Basic Info', icon: User },
    { num: 2, label: 'Education', icon: GraduationCap },
    { num: 3, label: 'Experience', icon: Briefcase },
    { num: 4, label: 'Projects', icon: FolderGit2 },
    { num: 5, label: 'Skills', icon: Wrench },
    { num: 6, label: 'Preferences', icon: Compass }
  ]

  return (
    <div className="stepper-viewport">
      <div className="stepper-card">
        
        {/* Top Header */}
        <div className="stepper-header">
          <div className="stepper-brand">
            <span className="brand-dot"></span>
            <span className="brand-title">GrowWoo Candidate Registration</span>
          </div>
          <button 
            type="button" 
            className="link-login-btn"
            onClick={onNavigateToLogin}
          >
            Already have an account? <strong>Log in</strong>
          </button>
        </div>

        {/* Stepper Progress Bar & Labels (Visible during steps 1-6) */}
        {currentStep <= 6 && (
          <div className="stepper-nav-bar">
            {stepsList.map(item => {
              const Icon = item.icon
              const isCompleted = currentStep > item.num
              const isCurrent = currentStep === item.num
              
              return (
                <div 
                  key={item.num}
                  className={`stepper-nav-item ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                >
                  <div className="stepper-icon-circle">
                    <Icon size={16} />
                  </div>
                  <span className="stepper-label">{item.label}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Notice when editing from preview */}
        {isEditingFromPreview && currentStep <= 6 && (
          <div className="edit-mode-banner">
            <span>✏️ You are currently editing this section.</span>
            <button 
              type="button" 
              className="btn-return-preview"
              onClick={handleReturnToPreview}
            >
              Done & Return to Preview
            </button>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger" style={{ margin: '1rem 2rem 0' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* STEP CONTENT BODY */}
        <div className="stepper-body">

          {/* ================= STEP 1: BASIC INFORMATION ================= */}
          {currentStep === 1 && (
            <div className="step-pane">
              <div className="step-intro">
                <h2>Personal & Contact Information</h2>
                <p>Provide your basic details to create your central profile.</p>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Rahul Sharma"
                    value={basicInfo.fullName}
                    onChange={(e) => handleBasicChange('fullName', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="e.g. rahul@example.com"
                    value={basicInfo.email}
                    onChange={(e) => handleBasicChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Create Password *</label>
                  <div className="input-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-input has-icon-right"
                      placeholder="Minimum 6 characters"
                      value={basicInfo.password}
                      onChange={(e) => handleBasicChange('password', e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="input-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Contact / Mobile Number *</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="e.g. +91 98765 43210"
                    value={basicInfo.phone}
                    onChange={(e) => handleBasicChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label">Current City</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Bengaluru"
                    value={basicInfo.city}
                    onChange={(e) => handleBasicChange('city', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Current State</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Karnataka"
                    value={basicInfo.state}
                    onChange={(e) => handleBasicChange('state', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. India"
                    value={basicInfo.country}
                    onChange={(e) => handleBasicChange('country', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">LinkedIn Profile URL</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={basicInfo.linkedinUrl}
                  onChange={(e) => handleBasicChange('linkedinUrl', e.target.value)}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">GitHub Profile URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://github.com/yourhandle"
                    value={basicInfo.githubUrl}
                    onChange={(e) => handleBasicChange('githubUrl', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Personal Portfolio or Website (Optional)</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://yourportfolio.dev"
                    value={basicInfo.portfolioUrl}
                    onChange={(e) => handleBasicChange('portfolioUrl', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 2: EDUCATION ================= */}
          {currentStep === 2 && (
            <div className="step-pane">
              <div className="step-intro">
                <h2>Educational Background</h2>
                <p>We evaluate opportunities against your degree, branch, and graduation year criteria.</p>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Degree (e.g. B.Tech, B.E, MCA, B.Sc) *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. B.Tech"
                    value={education.degree}
                    onChange={(e) => handleEduChange('degree', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Specialisation / Branch</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Computer Science and Engineering"
                    value={education.specialization}
                    onChange={(e) => handleEduChange('specialization', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">College or University Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. National Institute of Technology"
                  value={education.collegeName}
                  onChange={(e) => handleEduChange('collegeName', e.target.value)}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Graduation Year (Batch) *</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g. 2025 or 2026"
                    value={education.graduationYear}
                    onChange={(e) => handleEduChange('graduationYear', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">CGPA or Percentage</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 8.4 CGPA or 78%"
                    value={education.cgpaOrPercentage}
                    onChange={(e) => handleEduChange('cgpaOrPercentage', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Additional Academic History (Optional)</label>
                <textarea
                  className="form-input"
                  rows={2}
                  placeholder="12th grade / Diploma details, certifications, or coursework"
                  value={education.academicHistory}
                  onChange={(e) => handleEduChange('academicHistory', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ================= STEP 3: WORK & INTERNSHIP EXPERIENCE ================= */}
          {currentStep === 3 && (
            <div className="step-pane">
              <div className="step-intro">
                <h2>Internship & Work Experience</h2>
                <p>Do you have any practical internships or prior employment?</p>
              </div>

              {/* Freshers vs Experienced Decision Switch */}
              <div className="experience-decision-box">
                <p className="decision-title">Do you have any internship or work experience?</p>
                <div className="decision-options">
                  <button
                    type="button"
                    className={`decision-btn ${hasExperience === false ? 'selected' : ''}`}
                    onClick={() => setHasExperience(false)}
                  >
                    <span className="radio-dot"></span>
                    <div>
                      <strong>No, I am a Fresher</strong>
                      <p>Skip experience section and focus on projects.</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`decision-btn ${hasExperience === true ? 'selected' : ''}`}
                    onClick={() => setHasExperience(true)}
                  >
                    <span className="radio-dot"></span>
                    <div>
                      <strong>Yes, I have experience</strong>
                      <p>Internships, part-time, or previous employment.</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Conditional Experience Form: ONLY if hasExperience === true */}
              {hasExperience === true && (
                <div className="experience-items-container">
                  {experiences.map((exp, index) => (
                    <div key={index} className="experience-card-item">
                      <div className="item-header">
                        <h4>Experience #{index + 1}</h4>
                        {experiences.length > 1 && (
                          <button
                            type="button"
                            className="btn-remove"
                            onClick={() => removeExperience(index)}
                          >
                            <Trash2 size={16} /> Remove
                          </button>
                        )}
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">Company / Organisation Name *</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. Infosys, Startup, etc."
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Role / Designation *</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. Backend Developer Intern"
                            value={exp.role}
                            onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">Domain or Department</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. FinTech, Cloud Engineering"
                            value={exp.domain}
                            onChange={(e) => handleExperienceChange(index, 'domain', e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Duration (e.g. Jun 2025 - Aug 2025)</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. 3 Months (May 2025 - July 2025)"
                            value={exp.duration}
                            onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Responsibilities & Tasks Performed</label>
                        <textarea
                          className="form-input"
                          rows={3}
                          placeholder="Describe the tasks, features, or modules you worked on in detail..."
                          value={exp.responsibilities}
                          onChange={(e) => handleExperienceChange(index, 'responsibilities', e.target.value)}
                        />
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">Technologies, Tools & Platforms Used</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. Java, Spring Boot, PostgreSQL, Docker"
                            value={exp.technologies}
                            onChange={(e) => handleExperienceChange(index, 'technologies', e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Achievements or Measurable Impact</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. Optimized API response time by 30%"
                            value={exp.contributions}
                            onChange={(e) => handleExperienceChange(index, 'contributions', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn btn-outline btn-add-more"
                    onClick={addExperience}
                  >
                    <Plus size={16} /> Add Another Experience
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 4: DETAILED PROJECTS ================= */}
          {currentStep === 4 && (
            <div className="step-pane">
              <div className="step-intro">
                <h2>Detailed Project Information</h2>
                <p>Provide deep documentation of projects. Our resume generator transforms this into high-impact bullet points.</p>
              </div>

              {projects.map((proj, index) => (
                <div key={index} className="experience-card-item">
                  <div className="item-header">
                    <h4>Project #{index + 1}</h4>
                    {projects.length > 1 && (
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => removeProject(index)}
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Project Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. E-Commerce Microservices Platform"
                      value={proj.title}
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Problem the Project Was Designed to Solve</label>
                    <textarea
                      className="form-input"
                      rows={2}
                      placeholder="What problem or user challenge did this project address?"
                      value={proj.problemSolved}
                      onChange={(e) => handleProjectChange(index, 'problemSolved', e.target.value)}
                    />
                  </div>

                  <div className="form-grid-3">
                    <div className="form-group">
                      <label className="form-label">Languages Used</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Java, JavaScript, Python"
                        value={proj.languages}
                        onChange={(e) => handleProjectChange(index, 'languages', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Frameworks / Libraries</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Spring Boot, React"
                        value={proj.frameworks}
                        onChange={(e) => handleProjectChange(index, 'frameworks', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Database & Storage</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. PostgreSQL, Redis"
                        value={proj.database}
                        onChange={(e) => handleProjectChange(index, 'database', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Individual Contributions & Specific Implementation</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      placeholder="Detail what YOU personally implemented (e.g. built auth service, created database schema, integrated Stripe)..."
                      value={proj.contributions}
                      onChange={(e) => handleProjectChange(index, 'contributions', e.target.value)}
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Important Features & Functionalities</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. JWT Auth, Real-time Chat, Payment Gateway"
                        value={proj.features}
                        onChange={(e) => handleProjectChange(index, 'features', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">GitHub Repo or Live Project Link</label>
                      <input
                        type="url"
                        className="form-input"
                        placeholder="https://github.com/username/project"
                        value={proj.githubOrLiveLink}
                        onChange={(e) => handleProjectChange(index, 'githubOrLiveLink', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-outline btn-add-more"
                onClick={addProject}
              >
                <Plus size={16} /> Add Another Project
              </button>
            </div>
          )}

          {/* ================= STEP 5: TECHNICAL SKILLS ================= */}
          {currentStep === 5 && (
            <div className="step-pane">
              <div className="step-intro">
                <h2>Technical & Professional Skills</h2>
                <p>Categorize your technical capabilities for algorithmic job matching.</p>
              </div>

              <div className="form-group">
                <label className="form-label">Programming Languages *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Java, Python, JavaScript, TypeScript, C++"
                  value={skills.languages}
                  onChange={(e) => handleSkillChange('languages', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Frameworks & Libraries</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Spring Boot, React, Node.js, Express, Tailwind"
                  value={skills.frameworks}
                  onChange={(e) => handleSkillChange('frameworks', e.target.value)}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Databases</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. MySQL, PostgreSQL, MongoDB, Redis"
                    value={skills.databases}
                    onChange={(e) => handleSkillChange('databases', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Cloud Technologies</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. AWS, Azure, Google Cloud, Docker"
                    value={skills.cloudTools}
                    onChange={(e) => handleSkillChange('cloudTools', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Development & Productivity Tools</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Git, GitHub, Postman, Jira, VS Code, IntelliJ"
                    value={skills.devTools}
                    onChange={(e) => handleSkillChange('devTools', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Domain-Specific Knowledge</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. RESTful APIs, Microservices, OOP, Data Structures"
                    value={skills.domainKnowledge}
                    onChange={(e) => handleSkillChange('domainKnowledge', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 6: CAREER PREFERENCES ================= */}
          {currentStep === 6 && (
            <div className="step-pane">
              <div className="step-intro">
                <h2>Career Preferences</h2>
                <p>Tell us what kind of opportunities you want our internal system to identify and rank for you.</p>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Job Roles (comma separated) *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Java Developer, Software Engineer, Backend Engineer, Full Stack Developer"
                  value={preferences.jobRoles}
                  onChange={(e) => handlePrefChange('jobRoles', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Industry Domains</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. IT Services, SaaS, FinTech, E-Commerce, EdTech"
                  value={preferences.targetDomains}
                  onChange={(e) => handlePrefChange('targetDomains', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Locations</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Bengaluru, Hyderabad, Pune, Mumbai, Remote"
                  value={preferences.preferredLocations}
                  onChange={(e) => handlePrefChange('preferredLocations', e.target.value)}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Work Mode Preference</label>
                  <select
                    className="form-input"
                    value={preferences.workMode}
                    onChange={(e) => handlePrefChange('workMode', e.target.value)}
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                    <option value="Any">Any / Open to all</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Employment Type</label>
                  <select
                    className="form-input"
                    value={preferences.employmentType}
                    onChange={(e) => handlePrefChange('employmentType', e.target.value)}
                  >
                    <option value="Full-time">Full-time Employment</option>
                    <option value="Internship">Internship Only</option>
                    <option value="Both">Both (Internship & Full-time)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 7: PREVIEW & REVIEW SECTION ================= */}
          {currentStep === 7 && (
            <div className="step-pane preview-pane">
              <div className="step-intro">
                <h2>Review Your Profile</h2>
                <p>Verify your details before final submission. Click "Edit" on any section to make updates.</p>
              </div>

              {/* Section 1 Preview: Personal Details */}
              <div className="preview-section-card">
                <div className="preview-section-header">
                  <div className="section-title-wrap">
                    <User size={18} className="preview-section-icon" />
                    <h3>Personal & Contact Details</h3>
                  </div>
                  <button
                    type="button"
                    className="btn-edit-section"
                    onClick={() => handleEditSection(1)}
                  >
                    <Pencil size={14} /> Edit
                  </button>
                </div>
                <div className="preview-grid">
                  <div className="preview-item">
                    <span className="p-label">Full Name</span>
                    <span className="p-value">{basicInfo.fullName || '—'}</span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">Email Address</span>
                    <span className="p-value">{basicInfo.email || '—'}</span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">Phone</span>
                    <span className="p-value">{basicInfo.phone || '—'}</span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">Location</span>
                    <span className="p-value">
                      {[basicInfo.city, basicInfo.state, basicInfo.country].filter(Boolean).join(', ') || '—'}
                    </span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">LinkedIn</span>
                    <span className="p-value">
                      {basicInfo.linkedinUrl ? (
                        <a href={basicInfo.linkedinUrl} target="_blank" rel="noreferrer" className="preview-link">
                          {basicInfo.linkedinUrl} <ExternalLink size={12} />
                        </a>
                      ) : '—'}
                    </span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">GitHub</span>
                    <span className="p-value">
                      {basicInfo.githubUrl ? (
                        <a href={basicInfo.githubUrl} target="_blank" rel="noreferrer" className="preview-link">
                          {basicInfo.githubUrl} <ExternalLink size={12} />
                        </a>
                      ) : '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2 Preview: Education */}
              <div className="preview-section-card">
                <div className="preview-section-header">
                  <div className="section-title-wrap">
                    <GraduationCap size={18} className="preview-section-icon" />
                    <h3>Educational Information</h3>
                  </div>
                  <button
                    type="button"
                    className="btn-edit-section"
                    onClick={() => handleEditSection(2)}
                  >
                    <Pencil size={14} /> Edit
                  </button>
                </div>
                <div className="preview-grid">
                  <div className="preview-item">
                    <span className="p-label">Degree & Branch</span>
                    <span className="p-value">
                      {[education.degree, education.specialization].filter(Boolean).join(' - ') || '—'}
                    </span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">College / University</span>
                    <span className="p-value">{education.collegeName || '—'}</span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">Graduation Year</span>
                    <span className="p-value">{education.graduationYear || '—'}</span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">CGPA / Percentage</span>
                    <span className="p-value">{education.cgpaOrPercentage || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Section 3 Preview: Experience */}
              <div className="preview-section-card">
                <div className="preview-section-header">
                  <div className="section-title-wrap">
                    <Briefcase size={18} className="preview-section-icon" />
                    <h3>Work & Internship Experience</h3>
                  </div>
                  <button
                    type="button"
                    className="btn-edit-section"
                    onClick={() => handleEditSection(3)}
                  >
                    <Pencil size={14} /> Edit
                  </button>
                </div>

                {!hasExperience ? (
                  <div className="preview-fresher-badge">
                    <span>Fresher (No previous internship/work experience)</span>
                  </div>
                ) : (
                  <div className="preview-list">
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="preview-list-item">
                        <div className="item-row-top">
                          <strong>{exp.role || 'Role'}</strong> at <span>{exp.company || 'Company'}</span>
                          {exp.duration && <span className="item-duration">{exp.duration}</span>}
                        </div>
                        {exp.domain && <div className="item-domain">Domain: {exp.domain}</div>}
                        {exp.responsibilities && <p className="item-body">{exp.responsibilities}</p>}
                        {exp.technologies && (
                          <div className="item-chips">
                            <strong>Tech used:</strong> {exp.technologies}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 4 Preview: Projects */}
              <div className="preview-section-card">
                <div className="preview-section-header">
                  <div className="section-title-wrap">
                    <FolderGit2 size={18} className="preview-section-icon" />
                    <h3>Detailed Projects ({projects.length})</h3>
                  </div>
                  <button
                    type="button"
                    className="btn-edit-section"
                    onClick={() => handleEditSection(4)}
                  >
                    <Pencil size={14} /> Edit
                  </button>
                </div>
                <div className="preview-list">
                  {projects.map((proj, idx) => (
                    <div key={idx} className="preview-list-item">
                      <div className="item-row-top">
                        <strong>{proj.title || `Project #${idx + 1}`}</strong>
                        {proj.githubOrLiveLink && (
                          <a href={proj.githubOrLiveLink} target="_blank" rel="noreferrer" className="preview-link">
                            Repo/Demo <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                      {proj.problemSolved && (
                        <p className="item-body">
                          <strong>Problem:</strong> {proj.problemSolved}
                        </p>
                      )}
                      {proj.contributions && (
                        <p className="item-body">
                          <strong>Contributions:</strong> {proj.contributions}
                        </p>
                      )}
                      <div className="item-chips">
                        {[proj.languages, proj.frameworks, proj.database].filter(Boolean).join(' • ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5 Preview: Skills */}
              <div className="preview-section-card">
                <div className="preview-section-header">
                  <div className="section-title-wrap">
                    <Wrench size={18} className="preview-section-icon" />
                    <h3>Skills & Capabilities</h3>
                  </div>
                  <button
                    type="button"
                    className="btn-edit-section"
                    onClick={() => handleEditSection(5)}
                  >
                    <Pencil size={14} /> Edit
                  </button>
                </div>
                <div className="preview-grid">
                  <div className="preview-item">
                    <span className="p-label">Programming Languages</span>
                    <span className="p-value">{skills.languages || '—'}</span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">Frameworks & Libraries</span>
                    <span className="p-value">{skills.frameworks || '—'}</span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">Databases</span>
                    <span className="p-value">{skills.databases || '—'}</span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">Cloud Technologies</span>
                    <span className="p-value">{skills.cloudTools || '—'}</span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">Tools</span>
                    <span className="p-value">{skills.devTools || '—'}</span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">Domain Knowledge</span>
                    <span className="p-value">{skills.domainKnowledge || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Section 6 Preview: Career Preferences */}
              <div className="preview-section-card">
                <div className="preview-section-header">
                  <div className="section-title-wrap">
                    <Compass size={18} className="preview-section-icon" />
                    <h3>Career Preferences</h3>
                  </div>
                  <button
                    type="button"
                    className="btn-edit-section"
                    onClick={() => handleEditSection(6)}
                  >
                    <Pencil size={14} /> Edit
                  </button>
                </div>
                <div className="preview-grid">
                  <div className="preview-item">
                    <span className="p-label">Target Job Roles</span>
                    <span className="p-value">{preferences.jobRoles || '—'}</span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">Target Industry Domains</span>
                    <span className="p-value">{preferences.targetDomains || '—'}</span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">Preferred Locations</span>
                    <span className="p-value">{preferences.preferredLocations || '—'}</span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">Work Mode</span>
                    <span className="p-value">{preferences.workMode || '—'}</span>
                  </div>
                  <div className="preview-item">
                    <span className="p-label">Employment Type</span>
                    <span className="p-value">{preferences.employmentType || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Final Confirmation Banner */}
              <div className="preview-confirm-cta">
                <p>
                  Everything look good? Click <strong>Confirm & Complete Registration</strong> below to finalize your profile.
                </p>
                <div className="preview-action-row">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setCurrentStep(6)}
                  >
                    <ChevronLeft size={16} /> Back to Preferences
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                    onClick={handleFinalSubmit}
                  >
                    {isSubmitting ? 'Finalizing Profile...' : 'Confirm & Complete Registration'}
                    <Sparkles size={16} />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ================= STEP 8: SUCCESS COMPLETION ================= */}
          {currentStep === 8 && (
            <div className="step-pane success-pane">
              <div className="success-icon-badge">
                <CheckCircle2 size={48} className="success-icon" />
              </div>
              <h2>Registration & Profile Complete!</h2>
              <p className="success-desc">
                Your detailed profile has been created and verified. Our internal opportunity discovery system will begin matching verified opportunities with your qualifications.
              </p>
              
              <div className="success-summary-box">
                <div className="summary-item">
                  <span className="summary-label">Name</span>
                  <span className="summary-val">{basicInfo.fullName}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Email</span>
                  <span className="summary-val">{basicInfo.email}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Target Roles</span>
                  <span className="summary-val">{preferences.jobRoles}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Experience Status</span>
                  <span className="summary-val">{hasExperience ? `${experiences.length} Experience(s) listed` : 'Fresher'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Projects</span>
                  <span className="summary-val">{projects.length} Detailed Project(s)</span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-block"
                style={{ maxWidth: '300px', margin: '2rem auto 0' }}
                onClick={onNavigateToLogin}
              >
                Proceed to Log In
              </button>
            </div>
          )}

        </div>

        {/* Stepper Footer Controls (Next / Back / Preview) */}
        {currentStep <= 6 && (
          <div className="stepper-footer">
            {currentStep > 1 ? (
              <button
                type="button"
                className="btn btn-outline"
                onClick={handlePrev}
              >
                <ChevronLeft size={16} /> Back
              </button>
            ) : (
              <div></div>
            )}

            {isEditingFromPreview ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleReturnToPreview}
              >
                Save & Return to Preview <CheckCircle2 size={16} />
              </button>
            ) : currentStep < 6 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                Next Step <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (validateCurrentStep()) {
                    setCurrentStep(7)
                  }
                }}
              >
                Review Full Profile <ArrowRight size={16} />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
