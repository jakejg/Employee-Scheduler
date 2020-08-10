/* Maps a job status to a color */

function statusToColor() {
    const statusColor = {
        'under' : 'yellow',
        'filled' : 'green',
        'over' : 'red'
    }


    return statusColor
}

export default statusToColor;