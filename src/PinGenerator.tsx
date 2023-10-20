import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, Typography, SelectChangeEvent, Alert, AlertTitle } from '@mui/material';
import './PinGenerator.css'; // Import your CSS file
import { pinGenerator } from './utils';

function PinGenerator() {
    const [username, setUsername] = useState<string>('');
    const [pinLength, setPinLength] = useState<number>(4); // Default pin length is 4
    const [alertVisible, setAlertVisible] = useState<boolean>(false);
    const [generatedPin, setGeneratedPin] = useState<string>('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePinLengthChange = (e: SelectChangeEvent<number>) => {
        setPinLength(e.target.value as number);
    };

    const generatePin = () => {
        if (username.length < pinLength) {
            setAlertVisible(true);
            setGeneratedPin("");
        } else {
            setAlertVisible(false);
            // Generate a random string based on the username seed
            const pin = pinGenerator(username, pinLength);
            setGeneratedPin(pin);
        }
    };

    return (
        <div className="center-content">
            <Typography variant="h6">PIN Generation using Username</Typography> {/* Use Typography for the title */}
            <div className="form">
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <Select
                    label="Desired Length"
                    variant="outlined"
                    value={pinLength}
                    onChange={handlePinLengthChange}
                >
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    {/* You can add more options here */}
                </Select>
            </div>
            <Button variant="contained" color="primary" onClick={generatePin}>
                Generate PIN
            </Button>
            {generatedPin.length > 0 && (
                <Typography variant="body1">
                    Generated PIN: {generatedPin}
                </Typography>
            )}
            {alertVisible && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Username length is less than the desired length. Please enter a longer username.
                </Alert>
            )}
        </div>
    );
}

export default PinGenerator;
