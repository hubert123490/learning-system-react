import { render, screen } from "@testing-library/react"
import Footer from "../../components/Layout/Footer"

describe('Layout tests', () => {
    test('renders Footer', () => {
        // Arrange
        render(<Footer />);
    
        // Act
        
    
        // Assert
        const element = screen.getByText('Copyright 2022, Bubex Corporation', {exact: false})
        expect(element).toBeInTheDocument
    })
})
