import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X, Sparkles } from "lucide-react";

const SuccessModal = ({ showSuccess, setShowSuccess, isDarkMode }) => {
  
    return <AnimatePresence>
        {showSuccess && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0  }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowSuccess(false)}
            >
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className={`relative p-8 rounded-2xl border max-w-sm w-full text-center ${
                        isDarkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-200"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={() => setShowSuccess(false)}
                        className={`absolute top-4 right-4 p-1 rounded-full transition-colors ${
                            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                    >
                        <X size={18} />
                    </button>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6"
                    >
                        <CheckCircle size={32} className="text-white" />
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-medium mb-2"
                    >
                        Mensagem enviada!
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={` ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                            } mb-6`}
                    >
                        Obrigado por entrar em contato! Entrarei em contato com você em até 24 horas.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center"
                    >
                        <Sparkles className="text-yellow-500" size={24} />
                    </motion.div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
};

export default SuccessModal;