const testimonials = [
    {
        name: "Praveen Kumar",
        job: "consultant",
        image: "praveen.png",
        testimonial: "Thanks to OCD relief therapies, my daily struggles have eased. Small, consistent steps have brought immense relief. Grateful for the support and understanding, I'm now managing my thoughts better."
    },
    {
        name: "Emily ",
        job: "developer",
        image: "praveen.png",
        testimonial: "Discovering effective OCD treatments has been life-changing. With professional guidance, my anxiety has lessened, allowing me to regain control and find peace in everyday tasks. A true relief!"
    },
    {
        name: "Alex M",
        job: "manager",
        image: "praveen.png",
        testimonial: "OCD relief has been transformative for me. Learning coping mechanisms and embracing mindfulness techniques have significantly improved my daily life. I can now face challenges with resilience and calm."
    },
    {
        name: "Daniel",
        job: "engineer",
        image: "praveen.png",
        testimonial: "Incredible relief! Through therapy, I've found tools to navigate my obsessive thoughts. Understanding my triggers and adopting healthier habits has made a world of difference. Grateful for the journey to recovery."
    },
    {
        name: "Sophie",
        job: "CEO Fastwork",
        image: "praveen.png",
        testimonial: "OCD relief has brought back joy and spontaneity into my life. Therapy has equipped me with tools to manage intrusive thoughts, fostering a sense of control and tranquility. A powerful journey towards liberation."
    },
];
//current slide
let i = 0;

// total slides

let j = testimonials.length;

let testimonialContainer = document.getElementById("testimonial-container");
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
// next button for next slide by remainder method
nextButton.addEventListener("click", () => {
    i = (j + i + 1) % j;
    displayTestimonial()
})

// previous button for previous slide 
prevButton.addEventListener("click", () => {
    i = (j + i - 1) % j;
    displayTestimonial()
})

//testimonials function
let displayTestimonial = () => {
    testimonialContainer.innerHTML = `
    <p>${testimonials[i].testimonial}</p>
    <img src=${testimonials[i].image}>
    <h3>${testimonials[i].name}</h3>
    <h6>${testimonials[i].job}</h6>`
}

window.onload = displayTestimonial;
