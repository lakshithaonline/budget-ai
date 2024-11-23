import axios from 'axios';

export const measureNetworkLatency = async (): Promise<number> => {
    const startTime = performance.now();
    try {
        await axios.get('https://httpbin.org/get');
        const endTime = performance.now();
        return endTime - startTime;
    } catch (error) {
        console.error('Network request failed:', error);
        return 1000;
    }
};

export const getAdjustedDuration = async (baseDuration: number): Promise<number> => {
    try {
        const latency = await measureNetworkLatency();
        console.log('Measured Latency:', latency);

        let adjustedDuration = baseDuration;

        if (latency < 100) {
            adjustedDuration *= 0.75;
        } else if (latency < 300) {
            adjustedDuration = baseDuration;
        } else {
            adjustedDuration *= 1.5;
        }

        return adjustedDuration;
    } catch (error) {
        console.error('Failed to adjust duration due to error:', error);
        return baseDuration;
    }
};
