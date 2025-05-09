import React, { useState } from 'react'
import iconChevronDown from '../../assets/dashboard/chevron-down.svg'
interface DropdownProps {
  options: string[]
  selectedOption: string
  onSelect: (option: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: string) => {
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown-button">
        {selectedOption}
        <img src={iconChevronDown} alt="↓" />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className={`dropdown-item ${selectedOption === option ? 'selected' : ''}`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
