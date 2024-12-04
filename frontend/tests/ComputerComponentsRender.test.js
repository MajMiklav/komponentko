test('renders message when no components for a computer exist', async () => {
    // Mock API response with no components
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<ComputerComponents computerId="123" computerName="Test Computer" onAddComponent={jest.fn()} />);

    await waitFor(() => {
        expect(screen.getByText('No components found for Test Computer.')).toBeInTheDocument();
    });
});
