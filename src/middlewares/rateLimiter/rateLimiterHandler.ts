import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

export const rateLimiterHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo de 100 requisições por IP a cada 15 min
  standardHeaders: true, // Retorna os headers padrão de rate limit
  legacyHeaders: false,  // Desativa os headers `X-RateLimit-*` antigos
  // Só conta se a resposta foi erro (4xx ou 5xx)
  skip: (req: Request, res: Response) => {
    const status = res.statusCode;
    return status < 400; // se for sucesso (menor que 400), não conta
  },
  
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: 'Você excedeu o número de requisições permitidas. Por favor, tente novamente mais tarde.',
    });
  },
});