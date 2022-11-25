import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CONFIGURATION_KEYS } from 'src/ConfigurationSchema';

const OPENBOOK_API_URL = 'https://api.openbook.botpress.cloud';

interface QueryArtifactOptions {
  artifact_id: string;
  query: string;
}

@Injectable()
export class OpenBookClient {
  private readonly logger = new Logger(OpenBookClient.name);
  private readonly headers;

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.get<string>(
      CONFIGURATION_KEYS.OPENBOOK_API_TOKEN,
    );
    this.headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  public async queryArtifact(queryArtifactOptions: QueryArtifactOptions) {
    const endpoint = new URL(
      `/v1/artifacts/${queryArtifactOptions.artifact_id}/query`,
      OPENBOOK_API_URL,
    ).toString();

    try {
      //this.logger.log('endpoint', endpoint, 'headers', this.headers);
      const response = await axios.post(
        endpoint,
        {
          query: queryArtifactOptions.query,
          history: [],
          answer_level: 'strict',
        },
        {
          headers: this.headers,
        },
      );
      // this.logger.log('response.data', JSON.stringify(response.data));
      return response.data?.result?.answer;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
