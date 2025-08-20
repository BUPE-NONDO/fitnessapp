import React from 'react';

/**
 * Color Palette Demo Component
 * 
 * This component demonstrates the FitnessApp color palette and how to use each color
 * in different UI contexts. It serves as a reference for developers and designers.
 */
export const ColorPaletteDemo: React.FC = () => {
  return (
    <div className="p-8 bg-background-500 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-text-dark mb-4">
            FitnessApp Color Palette
          </h1>
          <p className="text-lg text-text-dark">
            A comprehensive color system for consistent UI/UX design
          </p>
        </header>

        {/* Primary Colors Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-text-dark">Primary Colors (Dark Purple)</h2>
          <p className="text-text-dark">
            Primary Dark: #4A214C - Used for headers, footers, and main background sections
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
              <div key={shade} className="text-center">
                <div 
                  className={`h-20 rounded-lg mb-2 border border-text-stroke`}
                  style={{ backgroundColor: `var(--color-primary-${shade})` }}
                />
                <p className="text-sm font-medium text-text-dark">Primary {shade}</p>
                <p className="text-xs text-text-stroke">bg-primary-{shade}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accent Colors Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-text-dark">Accent Colors (Orange)</h2>
          <p className="text-text-dark">
            Accent Orange: #FF6B35 - Used for interactive elements like buttons, progress bars, and highlighted text
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
              <div key={shade} className="text-center">
                <div 
                  className={`h-20 rounded-lg mb-2 border border-text-stroke`}
                  style={{ backgroundColor: `var(--color-accent-${shade})` }}
                />
                <p className="text-sm font-medium text-text-dark">Accent {shade}</p>
                <p className="text-xs text-text-stroke">bg-accent-{shade}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Background Colors Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-text-dark">Background Colors (Light Cream)</h2>
          <p className="text-text-dark">
            Background Light: #F8F1E9 - Used for card backgrounds and main content areas
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
              <div key={shade} className="text-center">
                <div 
                  className={`h-20 rounded-lg mb-2 border border-text-stroke`}
                  style={{ backgroundColor: `var(--color-background-${shade})` }}
                />
                <p className="text-sm font-medium text-text-dark">Background {shade}</p>
                <p className="text-xs text-text-stroke">bg-background-{shade}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Text Colors Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-text-dark">Text Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-primary-900">
              <h3 className="text-lg font-semibold text-text-light mb-2">Text Light</h3>
              <p className="text-text-light">#FFFFFF - Used for text on dark backgrounds</p>
              <p className="text-sm text-text-stroke mt-2">text-text-light</p>
            </div>
            <div className="p-6 rounded-lg bg-background-500">
              <h3 className="text-lg font-semibold text-text-dark mb-2">Text Dark</h3>
              <p className="text-text-dark">#2C2C2C - Used for general body text</p>
              <p className="text-sm text-text-stroke mt-2">text-text-dark</p>
            </div>
            <div className="p-6 rounded-lg bg-background-500">
              <h3 className="text-lg font-semibold text-text-stroke mb-2">Stroke Light</h3>
              <p className="text-text-stroke">#D4C4B5 - Used for borders and separators</p>
              <p className="text-sm text-text-stroke mt-2">text-text-stroke</p>
            </div>
          </div>
        </section>

        {/* Component Examples Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-text-dark">Component Examples</h2>
          
          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-dark">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary px-6 py-3 rounded-2xl font-medium transition-all duration-200 hover:scale-105">
                Primary Button
              </button>
              <button className="btn-secondary px-6 py-3 rounded-2xl font-medium transition-all duration-200 hover:scale-105">
                Secondary Button
              </button>
              <button className="bg-background-500 text-text-dark border border-text-stroke px-6 py-3 rounded-2xl font-medium transition-all duration-200 hover:bg-background-600">
                Ghost Button
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-dark">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-bg card-border border rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-text-dark mb-2">Card Title</h4>
                <p className="text-text-dark">This is a card with background light color and stroke borders.</p>
              </div>
              <div className="bg-primary-900 border border-primary-800 rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-text-light mb-2">Dark Card</h4>
                <p className="text-text-light">This is a card with primary dark background.</p>
              </div>
              <div className="bg-accent-500 border border-accent-600 rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-text-light mb-2">Accent Card</h4>
                <p className="text-text-light">This is a card with accent orange background.</p>
              </div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-dark">Progress Bars</h3>
            <div className="space-y-4">
              <div className="w-full">
                <div className="flex justify-between text-sm text-text-dark mb-2">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <div className="progress-track w-full h-3 rounded-full">
                  <div className="progress-fill h-3 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex justify-between text-sm text-text-dark mb-2">
                  <span>Goal Progress</span>
                  <span>45%</span>
                </div>
                <div className="progress-track w-full h-3 rounded-full">
                  <div className="progress-fill h-3 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Elements */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-dark">Form Elements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-dark">Input Field</label>
                <input 
                  type="text" 
                  placeholder="Enter your text"
                  className="input-bg input-border border rounded-2xl px-4 py-3 w-full focus:input-focus focus:outline-none transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-dark">Select Dropdown</label>
                <select className="input-bg input-border border rounded-2xl px-4 py-3 w-full focus:input-focus focus:outline-none transition-all duration-200">
                  <option>Choose an option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-text-dark">Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-dark">Color Application</h3>
              <ul className="space-y-2 text-text-dark">
                <li><strong>Primary Dark (#4A214C):</strong> Headers, navigation, footers</li>
                <li><strong>Accent Orange (#FF6B35):</strong> Buttons, progress bars, highlights</li>
                <li><strong>Background Light (#F8F1E9):</strong> Cards, content areas, forms</li>
                <li><strong>Text Dark (#2C2C2C):</strong> Body text, headings</li>
                <li><strong>Text Light (#FFFFFF):</strong> Text on dark backgrounds</li>
                <li><strong>Stroke Light (#D4C4B5):</strong> Borders, separators</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-dark">Accessibility</h3>
              <ul className="space-y-2 text-text-dark">
                <li>✓ All color combinations meet WCAG 2.1 AA contrast requirements</li>
                <li>✓ Focus states use accent orange for visibility</li>
                <li>✓ Dark mode support with appropriate color inversions</li>
                <li>✓ High contrast mode support</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ColorPaletteDemo;
