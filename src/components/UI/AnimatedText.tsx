import { motion, Variants } from "framer-motion";

interface AnimatedTextProps {
    text: string;
    className?: string;
    delayOffset?: number;
}

export default function AnimatedText({ text, className = "", delayOffset = 0 }: AnimatedTextProps) {
    // Split the text into words, keeping the spaces
    const words = text.split(" ").map((word, i) => ({
        word: word + (i !== text.split(" ").length - 1 ? "\u00A0" : ""), // Add non-breaking space except for last word
        id: `word-${i}`
    }));

    // Animation variants for the container to orchestrate staggered children
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04, // Very fast stagger per letter
                delayChildren: delayOffset,
            },
        },
    };

    // Animation variants for each individual letter
    const letterVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        },
    };

    return (
        <motion.span
            className={`inline-block ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {words.map((wordObj) => (
                <span key={wordObj.id} className="inline-block whitespace-nowrap">
                    {wordObj.word.split("").map((char, charIndex) => (
                        <motion.span
                            key={`${wordObj.id}-${charIndex}`}
                            variants={letterVariants}
                            className="inline-block"
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.span>
    );
}
