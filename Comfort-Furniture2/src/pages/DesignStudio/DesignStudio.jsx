import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button/Button';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import './DesignStudio.css';

const STEPS = [
  { id: 'upload', title: 'Inspiration' },
  { id: 'type', title: 'Table Type' },
  { id: 'dimensions', title: 'Dimensions' },
  { id: 'finish', title: 'Finishes' },
  { id: 'budget', title: 'Budget & Timeline' },
  { id: 'contact', title: 'Contact' },
];

export default function DesignStudio() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [files, setFiles] = useState([]);
  const [textDescription, setTextDescription] = useState('');
  const [tableType, setTableType] = useState('');
  const [dimensions, setDimensions] = useState({ width: 140, depth: 70, height: 75 });
  const [selectedWood, setSelectedWood] = useState('walnut');
  const [selectedLegs, setSelectedLegs] = useState('matte-black');
  const [budget, setBudget] = useState(1500);
  const [timeline, setTimeline] = useState('flexible');
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });

  // Drag & Drop State
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  // File Upload Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video/') ? 'video' : 'image'
    }));
    setFiles(curr => [...curr, ...newFiles].slice(0, 5)); // Max 5 files
  };

  const removeFile = (index) => {
    setFiles(curr => {
      const newFiles = [...curr];
      URL.revokeObjectURL(newFiles[index].url);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const renderStepContent = () => {
    switch (STEPS[currentStep].id) {
      case 'upload':
        return (
          <div className="ds-step">
            <h2 style={{ marginBottom: 'var(--space-2)' }}>Show us what you love.</h2>
            <p style={{ color: 'var(--color-text)', marginBottom: 'var(--space-8)' }}>Upload an image, a sketch, or a video of the style you're aiming for.</p>
            
            <div 
              className={`ds-upload-zone ${isDragging ? 'drag-active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="ds-upload-icon">📷</div>
              <h3 className="ds-upload-text">Drag & drop files here</h3>
              <p className="ds-upload-subtext">or click to browse (up to 5 images/videos)</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileInput} 
                style={{ display: 'none' }} 
                multiple 
                accept="image/*,video/*" 
              />
            </div>

            {files.length > 0 && (
              <div className="ds-files-list">
                {files.map((f, i) => (
                  <div key={i} className="ds-file-preview">
                    {f.type === 'image' ? (
                      <img src={f.url} alt={`Upload ${i}`} />
                    ) : (
                      <video src={f.url} muted />
                    )}
                    <button className="ds-file-remove" onClick={() => removeFile(i)}>✕</button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: 'var(--space-8)' }}>
              <label className="ds-label">Or describe it in words:</label>
              <textarea 
                className="ds-textarea" 
                placeholder="I'm looking for a solid wood desk with mid-century modern legs..."
                value={textDescription}
                onChange={e => setTextDescription(e.target.value)}
              />
            </div>
          </div>
        );

      case 'type':
        const types = [
          { id: 'desk', label: 'Working Desk', icon: '💻' },
          { id: 'dining', label: 'Dining Table', icon: '🍽️' },
          { id: 'coffee', label: 'Coffee Table', icon: '☕' },
          { id: 'conference', label: 'Conference Table', icon: '🤝' },
        ];
        return (
          <div className="ds-step">
            <h2 style={{ marginBottom: 'var(--space-8)' }}>What are we building?</h2>
            <div className="ds-options-grid">
              {types.map(t => (
                <div 
                  key={t.id} 
                  className={`ds-option-card ${tableType === t.id ? 'selected' : ''}`}
                  onClick={() => setTableType(t.id)}
                >
                  <span className="ds-option-icon">{t.icon}</span>
                  <span className="ds-option-label">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'dimensions':
        return (
          <div className="ds-step">
            <h2 style={{ marginBottom: 'var(--space-8)' }}>Approximate Dimensions</h2>
            
            <div className="ds-form-group">
              <label className="ds-label">Width (cm): {dimensions.width}</label>
              <div className="ds-slider-container">
                <input 
                  type="range" 
                  min="80" max="300" 
                  value={dimensions.width} 
                  onChange={e => setDimensions({...dimensions, width: parseInt(e.target.value)})}
                  className="ds-slider"
                />
                <div className="ds-slider-labels"><span>80cm</span><span>300cm</span></div>
              </div>
            </div>

            <div className="ds-form-group">
              <label className="ds-label">Depth (cm): {dimensions.depth}</label>
              <div className="ds-slider-container">
                <input 
                  type="range" 
                  min="40" max="150" 
                  value={dimensions.depth} 
                  onChange={e => setDimensions({...dimensions, depth: parseInt(e.target.value)})}
                  className="ds-slider"
                />
                <div className="ds-slider-labels"><span>40cm</span><span>150cm</span></div>
              </div>
            </div>

            <div className="ds-form-group">
              <label className="ds-label">Height (cm): {dimensions.height}</label>
              <div className="ds-slider-container">
                <input 
                  type="range" 
                  min="40" max="120" 
                  value={dimensions.height} 
                  onChange={e => setDimensions({...dimensions, height: parseInt(e.target.value)})}
                  className="ds-slider"
                />
                <div className="ds-slider-labels"><span>40cm</span><span>120cm (Standing)</span></div>
              </div>
            </div>
          </div>
        );

      case 'finish':
        return (
          <div className="ds-step">
            <h2 style={{ marginBottom: 'var(--space-8)' }}>Materials & Finish</h2>
            <ColorPicker 
              selectedWood={selectedWood}
              selectedLegs={selectedLegs}
              onWoodChange={setSelectedWood}
              onLegsChange={setSelectedLegs}
            />
          </div>
        );

      case 'budget':
        return (
          <div className="ds-step">
            <h2 style={{ marginBottom: 'var(--space-8)' }}>Budget & Timeline</h2>
            
            <div className="ds-form-group">
              <label className="ds-label">Estimated Budget: ${budget}</label>
              <div className="ds-slider-container">
                <input 
                  type="range" 
                  min="500" max="5000" step="100"
                  value={budget} 
                  onChange={e => setBudget(parseInt(e.target.value))}
                  className="ds-slider"
                />
                <div className="ds-slider-labels"><span>$500</span><span>$5,000+</span></div>
              </div>
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text)', marginTop: 'var(--space-2)' }}>
                * Final quote depends on material cost and complexity.
              </p>
            </div>

            <div className="ds-form-group" style={{ marginTop: 'var(--space-8)' }}>
              <label className="ds-label">When do you need it?</label>
              <select 
                className="ds-select"
                value={timeline}
                onChange={e => setTimeline(e.target.value)}
              >
                <option value="asap">As soon as possible</option>
                <option value="flexible">Flexible (Standard 3-6 weeks)</option>
                <option value="future">Planning for the future</option>
              </select>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="ds-step">
            <h2 style={{ marginBottom: 'var(--space-8)' }}>Where should we send the quote?</h2>
            
            <div className="ds-form-group">
              <label className="ds-label">Name</label>
              <input 
                type="text" 
                className="ds-input" 
                value={contactInfo.name}
                onChange={e => setContactInfo({...contactInfo, name: e.target.value})}
              />
            </div>
            
            <div className="ds-form-group">
              <label className="ds-label">Email</label>
              <input 
                type="email" 
                className="ds-input" 
                value={contactInfo.email}
                onChange={e => setContactInfo({...contactInfo, email: e.target.value})}
              />
            </div>

            <div className="ds-form-group">
              <label className="ds-label">Phone (Optional)</label>
              <input 
                type="tel" 
                className="ds-input" 
                value={contactInfo.phone}
                onChange={e => setContactInfo({...contactInfo, phone: e.target.value})}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <div className="design-studio-page">
        <div className="container">
          <div className="ds-container">
            <motion.div 
              className="ds-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div 
                className="ds-success-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                ✓
              </motion.div>
              <h2>Design Request Received!</h2>
              <p>We're reviewing your specifications. Our master craftsman will email you a quote within 24 hours.</p>
              <Button to="/" variant="solid" size="lg">Return to Home</Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="design-studio-page">
      <div className="container">
        <div className="ds-header">
          <h1>Design Studio</h1>
          <p>You imagine it, we build it. Tell us what you're looking for, and we'll craft a custom quote.</p>
        </div>

        <div className="ds-container">
          {/* Progress Indicator */}
          <div className="ds-progress">
            {STEPS.map((step, index) => (
              <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
                <div 
                  className={`ds-step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                  title={step.title}
                />
                {index < STEPS.length - 1 && (
                  <div className={`ds-step-line ${index < currentStep ? 'completed' : ''}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Actions */}
          <div className="ds-actions">
            <Button 
              variant="ghost" 
              onClick={handlePrev} 
              style={{ visibility: currentStep > 0 ? 'visible' : 'hidden' }}
            >
              Back
            </Button>
            
            <Button 
              variant={currentStep === STEPS.length - 1 ? 'sage' : 'solid'} 
              onClick={handleNext}
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? 'Submitting...' 
                : currentStep === STEPS.length - 1 
                  ? 'Submit Request' 
                  : 'Next Step'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
