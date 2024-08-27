document.addEventListener('DOMContentLoaded', () => {


    // Display the initial score
    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'scoreDisplay';
    scoreDisplay.style.position = 'absolute';
    scoreDisplay.style.top = '10%';
    scoreDisplay.style.right = '20px';
    scoreDisplay.style.fontSize = '24px';
    scoreDisplay.style.color = 'white';
    scoreDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    scoreDisplay.style.padding = '10px';
    scoreDisplay.style.borderRadius = '5px';
    scoreDisplay.style.zIndex = '1000'; // Ensure it's on top
    scoreDisplay.textContent = `Score: ${score}`;
    document.body.appendChild(scoreDisplay);

    // Create an audio element for the pop and click sounds
    const popSound = new Audio('media/Pop.mp3');
    const clickSound = new Audio('media/Click.wav');
    clickSound.volume = 0.25; // Set the click sound volume to 25%

    // Progress bar elements
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');

    // Add click event to move the video forward
    document.getElementById('section1').addEventListener('click', () => {
        moveVideoForward();
    });

    function reverseVideo() {
        clearInterval(reverseInterval);
        reverseInterval = setInterval(() => {
            if (video.currentTime > 0) {
                video.currentTime -= 0.1;
                updateProgressBar(); // Update progress bar as video reverses
            } else {
                clearInterval(reverseInterval); // Stop at the beginning
            }
        }, 100);
    }

    function moveVideoForward() {
        clearInterval(reverseInterval);
        video.currentTime += 0.15; // Move forward by 0.15 seconds on each click

        playClickSound();
        updateProgressBar(); // Update progress bar as video moves forward

        // Check if video is at the end
        if (video.currentTime >= video.duration) {
            video.currentTime = 0; // Reset to start if completed
            incrementScore(); // Increment the score
        }

        // Resume reversing after a short delay
        setTimeout(() => {
            reverseVideo();
        }, 100); // Adjust delay as needed
    }

    function playClickSound() {
        const clickClone = clickSound.cloneNode(); // Clone the click sound to allow overlapping
        clickClone.volume = clickSound.volume;
        clickClone.play();
    }

    function incrementScore() {
        score += 1; // Increment the score by 1
        scoreDisplay.textContent = `Score: ${score}`; // Update the score display
        popSound.play(); // Play the pop sound
    }

    function updateProgressBar() {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progress}%`;
    }
});