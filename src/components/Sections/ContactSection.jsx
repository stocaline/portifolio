import { useState, useRef } from "react";
import {
    motion,
    useInView,
    useScroll,
    useTransform,
} from "framer-motion";
import { Send } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { CONTACT_INFO, SOCIAL_LINKS } from "../../utils/data";
import { containerVariants, itemVariants } from "../../utils/helper";
import TextInput from "../Input/TextInput";
import SuccessModal from "../SuccessModal";
import { PopupModal } from "react-calendly";

const API_URL = import.meta.env.VITE_BACK_API_URL;

const ContactSetion = () => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const calendlyUrl = "https://calendly.com/richardbercheli/30min";

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const handleInputChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        console.log(API_URL)
        try {
            const response = await fetch(`${API_URL}/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('A resposta da rede não foi OK');
            }

            const result = await response.json();
            console.log(result);

            setIsSubmitting(false)
            setShowSuccess(true)
            setFormData({ name: "", email: "", message: "" });

            setTimeout(() => setShowSuccess(false), 3000);

        } catch (error) {
            console.error('Falha ao enviar e-mail:', error);
            setStatus('error');
        }

    };



    const handleScheduleClick = () => {
        console.log("aqqq")
        /* Opções extras (opcional):
        ({
            url: calendlyUrl,
            prefill: {
              name: 'John Doe',
              email: 'john.doe@example.com'
            },
            pageSettings: {
              backgroundColor: 'ffffff',
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: '00a2ff',
              textColor: '4d5055'
            }
        });
        */
    };

    return <section
        id="contact"
        ref={sectionRef}
        className={`py-24 px-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            } relative overflow-hidden`}
    >
        {/* Backgroud Elements */}
        <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
            <div
                className={`absolute top-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-blue-500" : "bg-blue-400"
                    }`}
            />
            <div
                className={`absolute bottom-40 rigth-1/4 w-80 h-80 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-purple-500" : "bg-purple-400"
                    }`}
            />
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">

            {/* Section Header */}
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
                className="text-center mb-20"
            >
                <motion.div
                    variants={itemVariants}
                    className={`text-sm uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-600"
                        } mb-4`}
                >
                    Vamos conversar
                </motion.div>

                <motion.h2
                    variants={itemVariants}
                    className="text-3xl md:text-5xl font-light mb-6"
                >
                    Entre em
                    <span className="text-blue-500 font-medium"> Contato</span>
                </motion.h2>

                <motion.p
                    values={itemVariants}
                    className={`text-xl max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                >
                    Pronto para começar seu próximo projeto? Vamos conversar sobre como podemos dar vida às suas ideias.
                </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
                {/* Contact Form */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <motion.div
                        variants={itemVariants}
                        className={`p-8 rounded-2xl border ${isDarkMode
                            ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                            : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                            }`}
                    >
                        <h3 className="text-2xl font-medium mb-8">Me envie uma mensagem</h3>
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <TextInput
                                    isDarkMode={isDarkMode}
                                    value={formData.name}
                                    handleInputChange={(text) =>
                                        handleInputChange("name", text)
                                    }
                                    label="Seu Nome"
                                />

                                <TextInput
                                    isDarkMode={isDarkMode}
                                    value={formData.email}
                                    handleInputChange={(text) =>
                                        handleInputChange("email", text)
                                    }
                                    label="Endereço de Email"
                                />
                            </div>

                            <TextInput
                                isDarkMode={isDarkMode}
                                value={formData.message}
                                textarea
                                handleInputChange={(text) =>
                                    handleInputChange("message", text)
                                }
                                label="Sua Mensagem"
                            />

                            <motion.button
                                disabled={isSubmitting}
                                whileHover={{ y: -2, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white py-4 rounded-xl text-sm uppercase tracking-wider font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                                onClick={handleSubmit}
                            >
                                {isSubmitting ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        <span>Enviando...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        <span>Enviar Mensagem</span>
                                    </>
                                )}
                            </motion.button>

                        </div>
                    </motion.div>
                </motion.div>

                {/* Contact Info & Social Links */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="space-y-8"
                >

                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-2xl font-medium mb-6">Informações de Contato</h3>
                        <div className="space-y-4">
                            {CONTACT_INFO.map((info, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ x: 4 }}
                                    className={`flex items-center space-x-4 p-4 rounded-xl ${isDarkMode
                                        ? "bg-gray-800/30 hover:bg-gray-800/50"
                                        : "bg-gray-50/50 hover:bg-gray-100/50"
                                        } transition-all duration-300`}
                                >
                                    <div
                                        className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-white"
                                            }`}
                                    >
                                        <info.icon size={20} className="text-blue-500" />
                                    </div>
                                    <div
                                        className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-600"
                                            }`}
                                    >
                                        {info.label}
                                    </div>
                                    <div className="font-medium">{info.value}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-medium mb-6">Me Siga</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {SOCIAL_LINKS.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 ${isDarkMode
                                        ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                                        : "bg-white/80 border-gray-200 hover:border-gray-300"
                                        } ${social.bgColor} ${social.color}`}
                                >
                                    <social.icon size={20} />
                                    <span className="font-medium">{social.name}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Availability Status */}
                    <motion.div
                        variants={itemVariants}
                        className={`p-6 rounded-xl border ${isDarkMode
                            ? "bg-green-500/10 border-green-500/20"
                            : "bg-green-50 border-green-200"
                            }`}
                    >
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            <span className="font-medium text-green-500">
                                Disponível para trabalhar
                            </span>
                        </div>
                        <p
                            className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                        >
                            No momento estou disponível para projetos freelance e para oportunidades full-time.
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom CTA */}
            {/* <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
                className="text-center mt-20"
            >
                <motion.div
                    variants={itemVariants}
                    className={`max-w-2xl mx-auto p-8 rounded-2xl border ${isDarkMode
                        ? "bg-gray-800/30 border-gray-700"
                        : "bg-gray-50/50 border-gray-200"
                        }`}
                >
                    <h3 className="text-xl font-medium mb-4">Prefere marcar uma chamada?</h3>
                    <p
                        className={`${isDarkMode ? "text-gray-400" : "text-gray-600"
                            } mb-6`}
                    >
                        Às vezes, uma conversa vale mais que mil mensagens. Sinta-se à vontade para agendar uma chamada para discutirmos o seu projeto.
                    </p>
                    <motion.button
                        whileHover={{ y: -2, scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-6 py-3 rounded-full border font-medium transition-all duration-300 ${isDarkMode
                            ? "border-gray-600 hover:border-blue-500 hover:text-blue-400"
                            : "border-gray-300 hover:border-blue-500 hover:text-blue-600"
                            }`}
                        onClick={handleScheduleClick}
                    >
                        Agendar uma Chamada
                    </motion.button>
                </motion.div>
            </motion.div> */}
        </div>

        <SuccessModal showSuccess={showSuccess} setShowSuccess={setShowSuccess} isDarkMode={isDarkMode} />
    </section>
};

export default ContactSetion;