import React from 'react';

const TestimonialsSection = () => {
    const testimonials = [
        {
            id: 1,
            name: 'John Doe',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 2,
            name: 'Jane Smith',
            message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
        },
        // Add more testimonials here
    ];

    return (
        <section className="testimonials-section">
            <h2>Testimonials</h2>
            <div className="testimonials-container">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testimonial">
                        <h3>{testimonial.name}</h3>
                        <p>{testimonial.message}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsSection;
