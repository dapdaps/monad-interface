export interface WSConfig {
  url: string;
  protocols?: string | string[];
  address: string;
  onMessage?: (event: MessageEvent) => void;
  heartbeatTimeout?: number;
  reconnectDelay?: number;
  maxReconnectAttempts?: number;
}

class WSClient {
  private ws: WebSocket | null = null;
  private onMessageCallback?: (event: MessageEvent) => void;
  private config: WSConfig;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private reconnectAttempts: number = 0;
  private isManualClose: boolean = false;
  private lastMessageTime: number = Date.now();

  constructor(config: WSConfig) {
    this.config = {
      heartbeatTimeout: 30000,
      reconnectDelay: 3000,
      maxReconnectAttempts: 5,
      ...config,
    };
    this.onMessageCallback = config.onMessage;
    this.connect();
  }

  private connect(): void {
    try {
      this.ws = new WebSocket(this.config.url, this.config.protocols);
      this.setupEventHandlers(this.config.address);
      this.startHeartbeat();
    } catch (error) {
      console.error('[WSClient] Failed to create WebSocket:', error);
      this.handleReconnect();
    }
  }

  private setupEventHandlers(address: string): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log('[WSClient] WebSocket connected');
      this.reconnectAttempts = 0;
      this.lastMessageTime = Date.now();

      const params = ['ethusdt@price', 'ethusdt@bet'];
      if (address) {
        params.push(`${address.toLowerCase()}@account`);
      }
      
      const subscribeMsg = JSON.stringify({
        id: 1,
        method: 'SUBSCRIBE',
        params,
      });
      this.send(subscribeMsg);
    };

    this.ws.onclose = () => {
      console.log('[WSClient] WebSocket disconnected');
      this.stopHeartbeat();
      
      if (!this.isManualClose) {
        this.handleReconnect();
      }
    };

    this.ws.onerror = (error) => {
      console.error('[WSClient] WebSocket error:', error);
    };

    this.ws.onmessage = (event: MessageEvent) => {
      this.lastMessageTime = Date.now();
      
      //   console.log('[WSClient] Received message:', event.data);
      if (this.onMessageCallback) {
        this.onMessageCallback(event);
      }
    };
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();
    
    this.heartbeatTimer = setInterval(() => {
      const now = Date.now();
      const timeSinceLastMessage = now - this.lastMessageTime;
      
      if (timeSinceLastMessage > (this.config.heartbeatTimeout || 30000)) {
        console.warn(`[WSClient] No message received for ${timeSinceLastMessage}ms, reconnecting...`);
        this.reconnect();
      }
    }, 5000);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private handleReconnect(): void {
    if (this.reconnectTimer) {
      return;
    }

    const maxAttempts = this.config.maxReconnectAttempts || 5;
    if (this.reconnectAttempts >= maxAttempts) {
      console.error(`[WSClient] Max reconnect attempts (${maxAttempts}) reached, giving up`);
      return;
    }

    this.reconnectAttempts++;
    const delay = this.config.reconnectDelay || 3000;
    
    console.log(`[WSClient] Attempting to reconnect (${this.reconnectAttempts}/${maxAttempts}) in ${delay}ms...`);
    
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, delay);
  }

  private reconnect(): void {
    console.log('[WSClient] Triggering reconnect...');
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.connect();
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
    this.isManualClose = true;
    this.stopHeartbeat();
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
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
