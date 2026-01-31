import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const defaultCode = `// Welcome to Swift Playground! 🚀
// Write and run Swift code here

let greeting = "Hello, World!"
print(greeting)

// Calculate sum
let numbers = [1, 2, 3, 4, 5]
let sum = numbers.reduce(0, +)
print("Sum: \\(sum)")

// Loop example
for i in 1...3 {
    print("Count: \\(i)")
}`

function SwiftPlayground() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const [code, setCode] = useState(defaultCode)
    const [output, setOutput] = useState('')
    const [isRunning, setIsRunning] = useState(false)
    const [error, setError] = useState(null)

    const runCode = async () => {
        setIsRunning(true)
        setOutput('')
        setError(null)

        try {
            // Use Piston API for Swift code execution
            // Piston is a free code execution engine
            const response = await fetch('https://emkc.org/api/v2/piston/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    language: 'swift',
                    version: '*',
                    files: [{
                        content: code
                    }]
                })
            })

            if (!response.ok) {
                throw new Error('Failed to execute code. Please try again.')
            }

            const data = await response.json()

            if (data.run) {
                // Combine stdout and stderr
                let result = ''
                if (data.run.stdout) {
                    result += data.run.stdout
                }
                if (data.run.stderr) {
                    if (result) result += '\n'
                    setError(data.run.stderr)
                } else if (result) {
                    setOutput(result)
                } else if (data.run.code === 0) {
                    setOutput('Code executed successfully (no output)')
                }

                // Check for compilation errors
                if (data.compile && data.compile.stderr) {
                    setError(data.compile.stderr)
                    setOutput('')
                }
            } else if (data.message) {
                setError(data.message)
            }
        } catch (err) {
            // Fallback error handling
            if (err.message.includes('Failed to fetch')) {
                setError('Unable to connect to the code execution service.\nPlease check your internet connection and try again.')
            } else {
                setError(err.message || 'An error occurred while executing the code.')
            }
        }

        setIsRunning(false)
    }

    const clearOutput = () => {
        setOutput('')
        setError(null)
    }

    const resetCode = () => {
        setCode(defaultCode)
        setOutput('')
        setError(null)
    }

    return (
        <section id="playground" className="playground" ref={ref}>
            <div className="container">
                <motion.span
                    className="section-badge orange"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    Swift Playground
                </motion.span>

                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Try Swift Code
                </motion.h2>

                <motion.p
                    className="section-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Write and run Swift code directly in your browser
                </motion.p>

                <motion.div
                    className="playground-container"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {/* Editor Header */}
                    <div className="playground-header">
                        <div className="window-controls">
                            <span className="control close"></span>
                            <span className="control minimize"></span>
                            <span className="control maximize"></span>
                        </div>
                        <div className="playground-title">
                            <i className="fab fa-swift"></i>
                            <span>Playground.swift</span>
                        </div>
                        <div className="playground-actions">
                            <button
                                className="action-btn reset-btn"
                                onClick={resetCode}
                                title="Reset Code"
                            >
                                <i className="fas fa-undo"></i>
                            </button>
                            <button
                                className="action-btn clear-btn"
                                onClick={clearOutput}
                                title="Clear Output"
                            >
                                <i className="fas fa-eraser"></i>
                            </button>
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div className="playground-editor">
                        <div className="line-numbers">
                            {code.split('\n').map((_, index) => (
                                <span key={index}>{index + 1}</span>
                            ))}
                        </div>
                        <textarea
                            className="code-input"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck="false"
                            placeholder="Write your Swift code here..."
                        />
                    </div>

                    {/* Run Button */}
                    <div className="playground-controls">
                        <motion.button
                            className={`run-btn ${isRunning ? 'running' : ''}`}
                            onClick={runCode}
                            disabled={isRunning}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isRunning ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Running...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-play"></i>
                                    Run Code
                                </>
                            )}
                        </motion.button>
                    </div>

                    {/* Output Console */}
                    <div className="playground-output">
                        <div className="output-header">
                            <i className="fas fa-terminal"></i>
                            <span>Console Output</span>
                        </div>
                        <div className="output-content">
                            {error ? (
                                <pre className="error-output">{error}</pre>
                            ) : output ? (
                                <pre className="success-output">{output}</pre>
                            ) : (
                                <span className="placeholder-output">
                                    Click "Run Code" to execute your Swift code...
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default SwiftPlayground
