import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.headers;
      // console.log("request : ", request);
      if (request.authorization) {
        const token = request.authorization.split(' ')[1];
        const decoded: any = jwt.verify(
          token,
          String(process.env.PRIVATEKEY_ACCESSTOCKEN),
        );
        req.body.token = decoded;
        next();
      } else {
        req.body.token = null;
        next();
      }
    } catch (err) {
      req.body.token = null;
      next();
    }
  }
}
