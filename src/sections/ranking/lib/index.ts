export function shareReferral(code: string) {

    const referralUrl = window.location.origin + "/referral?code=" + code;
    const shareText = encodeURIComponent(
        "/ …// ALERT: CREW RECRUITMENT LIVE //…//\n\nSTATUS: NADSA ORBIT OPEN\n\nACCESS: " + referralUrl + "\n\nNew crew wanted.\n\nEnter NADSA, explore the stations, and start earning RP.\n\nBoard now — the countdown has started."
    );
    const shareUrl = encodeURIComponent(referralUrl);
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
    window.open(twitterShareUrl, "_blank");
}