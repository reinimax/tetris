class PauseOverlay {
    render(ctx) {
        // Draw a semi-transparent overlay.
        ctx.fillStyle = 'rgba(255, 255, 255, .6)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Add text.
        ctx.fillStyle = 'rgb(45, 45, 45)';
        ctx.textAlign = 'center';
        ctx.font = 'bold 40px serif';
        ctx.fillText('\u{23F8}', ctx.canvas.width / 2, ctx.canvas.height / 2 - 30);
        ctx.font = 'bold 20px serif';
        ctx.fillText('Game paused.', ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.font = '16px serif';
        ctx.fillText('Press "Escape" to continue!', ctx.canvas.width / 2, ctx.canvas.height / 2 + 30);
    }
}

export { PauseOverlay }