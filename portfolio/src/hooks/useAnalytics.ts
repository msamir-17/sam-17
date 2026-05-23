import { useEffect, useRef, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Generate a persistent visitor ID (privacy-safe, stored in localStorage)
function generateVisitorId(): string {
    try {
        if (typeof window === 'undefined' || !window.localStorage) {
            return 'v_temp';
        }
        let visitorId = localStorage.getItem('_sa_vid');
        if (!visitorId) {
            visitorId = 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
            localStorage.setItem('_sa_vid', visitorId);
        }
        return visitorId;
    } catch {
        return 'v_temp';
    }
}

// Generate a session ID (unique per browser tab session)
function getSessionId(): string {
    try {
        if (typeof window === 'undefined' || !window.sessionStorage) {
            return 's_temp_' + Math.random().toString(36).slice(2, 8);
        }
        let sessionId = sessionStorage.getItem('_sa_sid');
        if (!sessionId) {
            sessionId = 's_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
            sessionStorage.setItem('_sa_sid', sessionId);
        }
        return sessionId;
    } catch {
        return 's_temp_' + Math.random().toString(36).slice(2, 8);
    }
}

// Detect device type
function getDeviceType(): string {
    const ua = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(ua) || (screen.width >= 600 && screen.width <= 1024 && 'ontouchstart' in window)) {
        return 'tablet';
    }
    if (/mobile|iphone|ipod|android.*mobile|windows phone|bb10|blackberry/i.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
}

// Detect browser
function getBrowser(): string {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox/')) return 'Firefox';
    if (ua.includes('Edg/')) return 'Edge';
    if (ua.includes('OPR/') || ua.includes('Opera/')) return 'Opera';
    if (ua.includes('Chrome/') && !ua.includes('Edg/')) return 'Chrome';
    if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari';
    return 'Other';
}

// Detect OS
function getOS(): string {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    return 'Other';
}

// Get referrer domain
function getReferrer(): string {
    if (!document.referrer) return 'direct';
    try {
        const url = new URL(document.referrer);
        // If referrer is same domain, it's internal navigation
        if (url.hostname === window.location.hostname) return 'internal';
        return url.hostname;
    } catch {
        return 'direct';
    }
}

// Send tracking event (fire-and-forget using fetch with keepalive fallback)
async function sendTrackEvent(payload: Record<string, unknown>): Promise<void> {
    if (typeof window === 'undefined') return;

    const data = {
        ...payload,
        visitorId: generateVisitorId(),
        sessionId: getSessionId(),
        device: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
        referrer: getReferrer(),
    };

    try {
        await fetch(`${API_URL}/api/analytics/track`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            keepalive: true
        });
    } catch {
        // Silently fail — analytics should never break the app
    }
}

// ==========================================
// Main Hook: Auto-tracks page views
// ==========================================
export function usePageView(page: string) {
    const tracked = useRef(false);

    useEffect(() => {
        if (tracked.current) return;
        tracked.current = true;

        sendTrackEvent({
            type: 'page_view',
            page
        });
    }, [page]);
}

// ==========================================
// Utility: Track project click
// ==========================================
export function trackProjectClick(projectId: string, projectTitle: string) {
    sendTrackEvent({
        type: 'project_click',
        page: '/projects',
        projectId,
        projectTitle
    });
}

// ==========================================
// Utility: Track resume download
// ==========================================
export function trackResumeDownload() {
    sendTrackEvent({
        type: 'resume_download',
        page: '/hero'
    });
}

// ==========================================
// Utility: Track project live link click
// ==========================================
export function trackLiveLinkClick(projectId: string, projectTitle: string) {
    sendTrackEvent({
        type: 'live_link_click',
        page: '/projects',
        projectId,
        projectTitle
    });
}

// ==========================================
// Utility: Track project github link click
// ==========================================
export function trackGithubClick(projectId: string, projectTitle: string) {
    sendTrackEvent({
        type: 'github_click',
        page: '/projects',
        projectId,
        projectTitle
    });
}
