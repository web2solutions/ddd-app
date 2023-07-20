/* eslint-disable no-unused-vars, global-require, import/no-extraneous-dependencies, no-console */
import express, {
  Express,
  Response,
  Request,
  RequestHandler,
} from 'express';
// import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { IApplication } from '../../IApplication';

export interface IERequest extends Request {
  requestTime: Date;
}

// import {
//  expressCspHeader, INLINE, NONE, SELF, NONCE,
// } from 'express-csp-header';

// import environment from '../config/environment';

// import Swagger from '../swagger/Swagger';

// import helloRouter from '../../interfaces/routes/hello';
// import userRouter from '../../interfaces/routes/user';

export class Server {
  private server: Express;
  private application: IApplication;
  constructor(application: IApplication) {
    this.application = application;
    // web server
    this.server = express();
    this.setup();
  }

  public setup(): void {
    // Express built in JSON parser
    this.server.use(express.json({
      //   limit: environment.HTTP_BODY_LIMIT,
    }));

    this.server.use(compression());

    // https / headers improvements
    this.server.use(helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'script-src': ["'self'", "'unsafe-inline'", 'localhost'],
        },
      },
    }));

    // enale Cross domain requests
    this.server.use(cors({
      origin: true,
      credentials: true,
    }));

    this.server.use((req: Request, res: Response, next) => {
      next(res.status(404).json({ message: 'Not Found' }));
    // respond 404
    });
  }

  public addRote(path: string, router: RequestHandler): void {
    this.server.use(path, router);
  }

  public async start(): Promise<void> {
    return new Promise((resolve) => {
      const port = 3000;
      // start configuration middlewares
      this.server.listen(port, () => {
        console.log(`express server started at ${port}`);
        resolve();
      });
    });
  }
}

export default Server;
