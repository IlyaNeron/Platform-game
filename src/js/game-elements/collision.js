export class Collision {

    constructor() {
        this.block = Array.from(document.querySelectorAll('.block'));
        this.cr = document.querySelector('.character');
    }

    detection() {
        this.block.forEach((block) => {

            if ((this.cr.getBoundingClientRect().left + 30) === (block.getBoundingClientRect().left)) {
                //  if ((this.cr.getBoundingClientRect().top) > (block.getBoundingClientRect().top + 30)) {
                console.log('dsfsf');
                alert('dsgd');
                //}
            }
        });
    }

}