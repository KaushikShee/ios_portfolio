import { motion, useInView } from 'framer-motion'
import { useRef, useState, useCallback, useEffect } from 'react'

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

// Swift autocomplete suggestions
const swiftSuggestions = [
    // Keywords
    { label: 'let', type: 'keyword', detail: 'constant declaration' },
    { label: 'var', type: 'keyword', detail: 'variable declaration' },
    { label: 'func', type: 'keyword', detail: 'function declaration' },
    { label: 'class', type: 'keyword', detail: 'class declaration' },
    { label: 'struct', type: 'keyword', detail: 'struct declaration' },
    { label: 'enum', type: 'keyword', detail: 'enum declaration' },
    { label: 'protocol', type: 'keyword', detail: 'protocol declaration' },
    { label: 'extension', type: 'keyword', detail: 'extension declaration' },
    { label: 'if', type: 'keyword', detail: 'conditional statement' },
    { label: 'else', type: 'keyword', detail: 'else branch' },
    { label: 'guard', type: 'keyword', detail: 'guard statement' },
    { label: 'switch', type: 'keyword', detail: 'switch statement' },
    { label: 'case', type: 'keyword', detail: 'case clause' },
    { label: 'for', type: 'keyword', detail: 'for loop' },
    { label: 'while', type: 'keyword', detail: 'while loop' },
    { label: 'return', type: 'keyword', detail: 'return statement' },
    { label: 'import', type: 'keyword', detail: 'import module' },
    { label: 'private', type: 'keyword', detail: 'access modifier' },
    { label: 'public', type: 'keyword', detail: 'access modifier' },
    { label: 'static', type: 'keyword', detail: 'static member' },
    { label: 'override', type: 'keyword', detail: 'override method' },
    { label: 'init', type: 'keyword', detail: 'initializer' },
    { label: 'true', type: 'keyword', detail: 'boolean true' },
    { label: 'false', type: 'keyword', detail: 'boolean false' },
    { label: 'nil', type: 'keyword', detail: 'null value' },
    { label: 'self', type: 'keyword', detail: 'self reference' },
    { label: 'async', type: 'keyword', detail: 'async function' },
    { label: 'await', type: 'keyword', detail: 'await async' },
    { label: 'try', type: 'keyword', detail: 'try expression' },
    { label: 'catch', type: 'keyword', detail: 'catch block' },
    { label: 'throw', type: 'keyword', detail: 'throw error' },
    // Types
    { label: 'String', type: 'type', detail: 'String type' },
    { label: 'Int', type: 'type', detail: 'Integer type' },
    { label: 'Double', type: 'type', detail: 'Double type' },
    { label: 'Float', type: 'type', detail: 'Float type' },
    { label: 'Bool', type: 'type', detail: 'Boolean type' },
    { label: 'Array', type: 'type', detail: 'Array type' },
    { label: 'Dictionary', type: 'type', detail: 'Dictionary type' },
    { label: 'Optional', type: 'type', detail: 'Optional type' },
    { label: 'Any', type: 'type', detail: 'Any type' },
    { label: 'Void', type: 'type', detail: 'Void type' },
    // Functions
    { label: 'print()', type: 'function', detail: 'print to console' },
    { label: 'map()', type: 'function', detail: 'transform elements' },
    { label: 'filter()', type: 'function', detail: 'filter elements' },
    { label: 'reduce()', type: 'function', detail: 'reduce to value' },
    { label: 'forEach()', type: 'function', detail: 'iterate elements' },
    { label: 'sorted()', type: 'function', detail: 'sort elements' },
    { label: 'contains()', type: 'function', detail: 'check if contains' },
    { label: 'append()', type: 'function', detail: 'append element' },
    { label: 'count', type: 'property', detail: 'element count' },
    { label: 'isEmpty', type: 'property', detail: 'check if empty' },
]

// Swift syntax highlighter using token-based approach
const highlightSwift = (code) => {
    const keywords = new Set([
        'let', 'var', 'func', 'class', 'struct', 'enum', 'protocol', 'extension',
        'if', 'else', 'guard', 'switch', 'case', 'default', 'break', 'continue',
        'for', 'while', 'repeat', 'in', 'return', 'throw', 'throws', 'try', 'catch',
        'import', 'public', 'private', 'internal', 'fileprivate', 'open', 'static',
        'override', 'final', 'lazy', 'weak', 'unowned', 'mutating', 'nonmutating',
        'init', 'deinit', 'subscript', 'typealias', 'associatedtype', 'where',
        'true', 'false', 'nil', 'self', 'Self', 'super', 'async', 'await'
    ])

    let result = ''
    let i = 0

    while (i < code.length) {
        // Check for comments
        if (code[i] === '/' && code[i + 1] === '/') {
            let comment = ''
            while (i < code.length && code[i] !== '\n') {
                comment += code[i] === '<' ? '&lt;' : code[i] === '>' ? '&gt;' : code[i] === '&' ? '&amp;' : code[i]
                i++
            }
            result += `<span class="syntax-comment">${comment}</span>`
            continue
        }

        // Check for strings
        if (code[i] === '"') {
            let str = '"'
            i++
            while (i < code.length && code[i] !== '"') {
                if (code[i] === '\\' && i + 1 < code.length) {
                    str += code[i] === '<' ? '&lt;' : code[i] === '>' ? '&gt;' : code[i] === '&' ? '&amp;' : code[i]
                    i++
                    str += code[i] === '<' ? '&lt;' : code[i] === '>' ? '&gt;' : code[i] === '&' ? '&amp;' : code[i]
                    i++
                    continue
                }
                str += code[i] === '<' ? '&lt;' : code[i] === '>' ? '&gt;' : code[i] === '&' ? '&amp;' : code[i]
                i++
            }
            if (i < code.length) {
                str += '"'
                i++
            }
            result += `<span class="syntax-string">${str}</span>`
            continue
        }

        // Check for numbers
        if (/\d/.test(code[i])) {
            let num = ''
            while (i < code.length && /[\d.]/.test(code[i])) {
                num += code[i]
                i++
            }
            result += `<span class="syntax-number">${num}</span>`
            continue
        }

        // Check for identifiers and keywords
        if (/[a-zA-Z_]/.test(code[i])) {
            let word = ''
            while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
                word += code[i]
                i++
            }

            if (keywords.has(word)) {
                result += `<span class="syntax-keyword">${word}</span>`
            } else if (/^[A-Z]/.test(word)) {
                result += `<span class="syntax-type">${word}</span>`
            } else if (code[i] === '(') {
                result += `<span class="syntax-function">${word}</span>`
            } else {
                result += word
            }
            continue
        }

        // Regular characters
        result += code[i] === '<' ? '&lt;' : code[i] === '>' ? '&gt;' : code[i] === '&' ? '&amp;' : code[i]
        i++
    }

    return result
}

function SwiftPlayground() {
    const ref = useRef(null)
    const textareaRef = useRef(null)
    const highlightRef = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const [code, setCode] = useState(defaultCode)
    const [output, setOutput] = useState('')
    const [isRunning, setIsRunning] = useState(false)
    const [error, setError] = useState(null)

    // Autocomplete state
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [suggestions, setSuggestions] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 })

    // Get current word being typed
    const getCurrentWord = useCallback(() => {
        if (!textareaRef.current) return ''
        const textarea = textareaRef.current
        const cursorPos = textarea.selectionStart
        const textBeforeCursor = code.substring(0, cursorPos)
        const match = textBeforeCursor.match(/[a-zA-Z_][a-zA-Z0-9_]*$/)
        return match ? match[0] : ''
    }, [code])

    // Extract declared variables from the code
    const extractDeclaredVariables = useCallback(() => {
        const variables = []
        // Match let/var declarations: let name = or var name = or let name: Type
        const regex = /(?:let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?::|=)/g
        let match
        while ((match = regex.exec(code)) !== null) {
            const varName = match[1]
            // Don't add duplicates
            if (!variables.find(v => v.label === varName)) {
                variables.push({
                    label: varName,
                    type: 'variable',
                    detail: 'declared variable'
                })
            }
        }

        // Also extract function parameters and for loop variables
        const forLoopRegex = /for\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+in/g
        while ((match = forLoopRegex.exec(code)) !== null) {
            const varName = match[1]
            if (!variables.find(v => v.label === varName)) {
                variables.push({
                    label: varName,
                    type: 'variable',
                    detail: 'loop variable'
                })
            }
        }

        return variables
    }, [code])

    // Filter suggestions based on current word
    const updateSuggestions = useCallback(() => {
        const currentWord = getCurrentWord()
        if (currentWord.length < 2) {
            setShowSuggestions(false)
            return
        }

        // Get user-declared variables
        const declaredVars = extractDeclaredVariables()

        // Combine built-in suggestions with declared variables
        const allSuggestions = [...declaredVars, ...swiftSuggestions]

        const filtered = allSuggestions.filter(s =>
            s.label.toLowerCase().startsWith(currentWord.toLowerCase())
        ).slice(0, 8) // Show max 8 suggestions

        if (filtered.length > 0) {
            setSuggestions(filtered)
            setSelectedIndex(0)
            setShowSuggestions(true)

            // Calculate cursor position for dropdown
            if (textareaRef.current) {
                const textarea = textareaRef.current
                const cursorPos = textarea.selectionStart
                const textBeforeCursor = code.substring(0, cursorPos)
                const lines = textBeforeCursor.split('\n')
                const lineNumber = lines.length
                const charInLine = lines[lines.length - 1].length

                // Approximate position (with line-numbers offset)
                const lineHeight = 22 // Approximate line height
                const charWidth = 8.5 // Approximate char width for monospace
                const top = lineNumber * lineHeight
                const left = charInLine * charWidth + 60 // 60px for line numbers

                setCursorPosition({ top, left })
            }
        } else {
            setShowSuggestions(false)
        }
    }, [getCurrentWord, extractDeclaredVariables, code])

    // Apply suggestion
    const applySuggestion = useCallback((suggestion) => {
        if (!textareaRef.current) return

        const textarea = textareaRef.current
        const cursorPos = textarea.selectionStart
        const currentWord = getCurrentWord()

        // Replace current word with suggestion
        const textBefore = code.substring(0, cursorPos - currentWord.length)
        const textAfter = code.substring(cursorPos)
        const insertion = suggestion.label

        setCode(textBefore + insertion + textAfter)
        setShowSuggestions(false)

        // Restore focus and cursor position
        setTimeout(() => {
            textarea.focus()
            const newPos = textBefore.length + insertion.length
            textarea.setSelectionRange(newPos, newPos)
        }, 0)
    }, [code, getCurrentWord])

    // Handle keyboard navigation in suggestions
    const handleKeyDown = useCallback((e) => {
        if (!showSuggestions) return

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex(prev => (prev + 1) % suggestions.length)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length)
        } else if (e.key === 'Tab' || e.key === 'Enter') {
            if (suggestions.length > 0) {
                e.preventDefault()
                applySuggestion(suggestions[selectedIndex])
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false)
        }
    }, [showSuggestions, suggestions, selectedIndex, applySuggestion])

    // Update suggestions on code change
    useEffect(() => {
        updateSuggestions()
    }, [code, updateSuggestions])

    // Sync scroll between textarea and highlight overlay
    const handleScroll = useCallback(() => {
        if (textareaRef.current && highlightRef.current) {
            highlightRef.current.scrollTop = textareaRef.current.scrollTop
            highlightRef.current.scrollLeft = textareaRef.current.scrollLeft
        }
    }, [])

    const runCode = async () => {
        setIsRunning(true)
        setOutput('')
        setError(null)
        setShowSuggestions(false)

        try {
            // Use Piston API for Swift code execution
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

                if (data.compile && data.compile.stderr) {
                    setError(data.compile.stderr)
                    setOutput('')
                }
            } else if (data.message) {
                setError(data.message)
            }
        } catch (err) {
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
        setShowSuggestions(false)
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
                    Try Swift Code!
                </motion.h2>

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

                    {/* Code Editor with Syntax Highlighting */}
                    <div className="playground-editor">
                        <div className="line-numbers">
                            {code.split('\n').map((_, index) => (
                                <span key={index}>{index + 1}</span>
                            ))}
                        </div>
                        <div className="code-editor-wrapper">
                            {/* Syntax highlighted overlay */}
                            <pre
                                ref={highlightRef}
                                className="code-highlight"
                                aria-hidden="true"
                                dangerouslySetInnerHTML={{ __html: highlightSwift(code) + '\n' }}
                            />
                            {/* Actual textarea for input */}
                            <textarea
                                ref={textareaRef}
                                className="code-input"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                onScroll={handleScroll}
                                onKeyDown={handleKeyDown}
                                spellCheck="false"
                                placeholder="Write your Swift code here..."
                            />

                            {/* Autocomplete Dropdown */}
                            {showSuggestions && suggestions.length > 0 && (
                                <div
                                    className="autocomplete-dropdown"
                                    style={{
                                        top: `${cursorPosition.top}px`,
                                        left: `${Math.min(cursorPosition.left, 300)}px`
                                    }}
                                >
                                    {suggestions.map((suggestion, index) => (
                                        <div
                                            key={suggestion.label}
                                            className={`autocomplete-item ${index === selectedIndex ? 'selected' : ''}`}
                                            onClick={() => applySuggestion(suggestion)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                        >
                                            <span className={`autocomplete-icon ${suggestion.type}`}>
                                                {suggestion.type === 'keyword' && 'K'}
                                                {suggestion.type === 'type' && 'T'}
                                                {suggestion.type === 'function' && 'F'}
                                                {suggestion.type === 'property' && 'P'}
                                                {suggestion.type === 'variable' && 'V'}
                                            </span>
                                            <span className="autocomplete-label">{suggestion.label}</span>
                                            <span className="autocomplete-detail">{suggestion.detail}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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
