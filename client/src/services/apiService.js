const API_URL = 'http://localhost:5000/api';

export const getCryptoBalance = async () => {
    try {
        console.log('Api starting');
        const response = await fetch(`${API_URL}/balance`);
        console.log(response);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching balance:', error);
        return null;
    }
};
