export function shareReferral(code: string) {
    const shareText = encodeURIComponent(
        "New crew wanted.\n\nEnter NADSA, explore the stations, and start earning RP.\n\nBoard now — the countdown has started."
    );
    const shareUrl = encodeURIComponent(window.location.origin + "/referral?code=" + code);
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
    window.open(twitterShareUrl, "_blank");
}