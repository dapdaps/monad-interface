export interface WSConfig {
  url: string;
  protocols?: string | string[];
  address: string;
  onMessage?: (event: MessageEvent) => void;
}

class WSClient {
  private ws: WebSocket | null = null;
  private onMessageCallback?: (event: MessageEvent) => void;

  constructor(config: WSConfig) {
    this.ws = new WebSocket(config.url, config.protocols);
    this.onMessageCallback = config.onMessage;
    this.setupEventHandlers(config.address);
  }

  private setupEventHandlers(address: string): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log('[WSClient] WebSocket connected');
      
      const subscribeMsg = JSON.stringify({
        id: 1,
        method: 'SUBSCRIBE',
        params: ['ethusdt@price', 'ethusdt@bet', `${address.toLowerCase()}@account`],
      });
      this.send(subscribeMsg);
    };

    this.ws.onclose = () => {
      console.log('[WSClient] WebSocket disconnected');
    };

    this.ws.onerror = (error) => {
      console.error('[WSClient] WebSocket error:', error);
    };

    this.ws.onmessage = (event: MessageEvent) => {
    //   console.log('[WSClient] Received message:', event.data);
      if (this.onMessageCallback) {
        this.onMessageCallback(event);
      }
    };
  }

  public send(data: string | ArrayBuffer | Blob): boolean {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('[WSClient] WebSocket not connected, cannot send message');
      return false;
    }

    try {
      this.ws.send(data);
      console.log('[WSClient] Sent message:', data);
      return true;
    } catch (error) {
      console.error('[WSClient] Failed to send message:', error);
      return false;
    }
  }

  public isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  public getReadyState(): number {
    return this.ws ? this.ws.readyState : WebSocket.CLOSED;
  }

  public close(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  public getWebSocket(): WebSocket | null {
    return this.ws;
  }
}

export default WSClient;
