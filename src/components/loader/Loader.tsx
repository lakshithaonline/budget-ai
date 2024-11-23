import React, { useEffect, useState, useMemo } from 'react';
import ReactLoading from 'react-loading';
import styles from './Loader.module.css';
import { getAdjustedDuration } from "../../utils/networkMonitor";

interface LoaderProps {
    type?: 'bubbles' | 'bars' | 'cylon' | 'spin' | 'spokes' | 'balls' | 'spinningBubbles';
    color?: string;
    height?: number;
    width?: number;
    message?: string;
    isLoading?: boolean;
    errorMessage?: string;
    duration?: number;
    theme?: 'light' | 'dark';
    timeout?: number;
    backgroundImage?: string;
    gradientBackground?: string;
}

const Loader: React.FC<LoaderProps> = ({
                                           type = 'spin',
                                           color = '#3498db',
                                           height = 100,
                                           width = 100,
                                           message = "Loading...",
                                           isLoading = true,
                                           errorMessage,
                                           duration = 3000,
                                           theme = 'light',
                                           timeout,
                                           backgroundImage,
                                           gradientBackground,
                                       }) => {
    const [progress, setProgress] = useState(0);
    const [loadingError, setLoadingError] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        let timer: NodeJS.Timeout | undefined;

        if (isLoading) {
            getAdjustedDuration(duration).then(adjustedDuration => {
                interval = setInterval(() => {
                    setProgress(prev => (prev < 100 ? prev + 10 : 100));
                }, adjustedDuration / 10);

                if (timeout) {
                    timer = setTimeout(() => {
                        setLoadingError(true);
                    }, timeout);
                }
            });
        }

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [isLoading, duration, timeout]);

    const loaderStyle: React.CSSProperties = useMemo(() => ({
        backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
        color: theme === 'light' ? '#333' : '#f0f0f0',
        backgroundImage: gradientBackground || (backgroundImage ? `url(${backgroundImage})` : undefined),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: `background-color ${duration}ms ease-in-out`,
        padding: '20px',
        borderRadius: '10px',
        textAlign: "center",
        minHeight: '100vh',
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: theme === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.5)' : '0 4px 20px rgba(255, 255, 255, 0.5)',
    }), [theme, duration, gradientBackground, backgroundImage]);

    return (
        <div className={styles.loaderContainer} style={loaderStyle} role="alert" aria-live="assertive">
            {isLoading && !loadingError ? (
                <>
                    <ReactLoading type={type} color={color} height={height} width={width} />
                    <p className={styles.loadingMessage}>{message}</p>
                    <p className={styles.progressText}>Progress: {progress}%</p>
                </>
            ) : (
                <p className={styles.errorText}>
                    {errorMessage || "An error occurred while loading."}
                </p>
            )}
        </div>
    );
};

export default Loader;