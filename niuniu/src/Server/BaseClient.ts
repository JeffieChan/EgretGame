module Server {
    export enum ClientState{
        Disconnected,
        Connecting,
        Connedted
    }
	export class BaseClient {
        static EVENT_IO_ERROR:string = "io-error";
        static EVENT_CLOSE:string = "close";
        static EVENT_KICK:string = "onKick";
        static EVENT_HEART_BEAT_TIMEOUT:string = 'heartbeat timeout';
        static DEBUG:boolean = true;
		static MAX_REQ_COUNT:number = 255;
		protected initCallback:Function = null;
        protected socket:egret.WebSocket = null;
        protected callbacks:any = {};
        protected eventCallbacks:any = {};
        public State:ClientState;
		private reqId:number = 1;
		public constructor() {
            this.State = ClientState.Disconnected;
		}
        public on(event, fn){
            (this.eventCallbacks[event] = this.eventCallbacks[event] || []).push(fn);
        }
		public init(params:any,initCb:Function){
            this.State = ClientState.Connecting;
			this.initCallback = initCb;
            var host = params.host;
            var port = params.port;
			this.initWebSocket(host,port);

		}
        public close(){
            this.socket.flush();
            this.socket.close();
        }
        public reConnect(host,port,callback:Function){
            this.init({host:host,port:port},callback);
        }
        public isConnected():boolean{
            console.log(`socket connected: ${this.socket.connected}`);
            return this.socket.connected;
        }
        private initWebSocket(host,port):void{
            console.log("[Pomelo] connect to:",host,port);
            console.log(this.socket);
            this.socket = null;
            this.socket = new egret.WebSocket();
            this.socket.type = egret.WebSocket.TYPE_STRING;

            this.socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onMessage, this);
            this.socket.connect(host,port);

        }
        private onConnect(e:egret.Event):void {
            this.State = ClientState.Connedted;
            console.log("[Pomelo] connect success",e);

            this.initCallback(true);
        }

        private onClose(e:egret.Event):void {
            console.error("[Pomelo] connect close:",e);

            this.emit(BaseClient.EVENT_CLOSE,e);
        }

        private onIOError(e:egret.Event):void{
            console.error('socket error: ', e);
            this.emit(BaseClient.EVENT_IO_ERROR, e);
        }
		
        private onMessage(event:egret.Event):void{
            let message:string = this.socket.readUTF();
            console.log(new Date().toString() + "收到服务器端的消息：" + message);

            let msgPackage:MessagePackage = <MessagePackage>JSON.parse(message);
            this.processMessage(msgPackage);
        }

        private processMessage(msg:MessagePackage) {
            console.log(`processMessage`);
            console.log(msg);
            if(!msg.ReqId || msg.ReqId == 0) {
                // server push message
                if(GateClient.DEBUG){
                    console.group("EVENT:");
                    console.info("Route:",msg.ReqId);
                    console.info("Msg:",msg.Data);
                    console.groupEnd();
                }

                this.emit(msg.Route, msg.Data);
                return;
            }

            if(GateClient.DEBUG){
                console.group("RESPONSE:");
                console.info("Id:",msg.ReqId);
                console.info("Msg:",msg.Data);
                console.groupEnd();
            }

            //if have a id then find the callback function with the request
            var cb = this.callbacks[msg.ReqId];

            delete this.callbacks[msg.ReqId];
            if(typeof cb !== 'function') {
                return;
            }
            if(msg.Code == 500){
                var obj:any = {"code":500,"desc":"服务器内部错误","key":"INTERNAL_ERROR"};
                msg.Data = msg.Data;
            }
            cb(msg);
            return;
        }

        private emit(event, ...args:any[]){
            var params = [].slice.call(arguments, 1);
            var callbacks = this.eventCallbacks[event];

            if (callbacks) {
                callbacks = callbacks.slice(0);
                for (var i = 0, len = callbacks.length; i < len; ++i) {
                    callbacks[i].apply(this, params);
                }
            }

            return this;
        }

        protected request(msg, cb) {
            this.reqId++;
            if(this.reqId>BaseClient.MAX_REQ_COUNT){
                this.reqId = 1;
            }
            var reqId = this.reqId;
            msg.reqId = reqId;


            if(BaseClient.DEBUG){
                console.group("REQUEST:");
                console.log("Id:",reqId);
                console.log("Param:",msg);
                console.groupEnd();
            }

            if (this.socket && this.socket.connected)
            {
                this.socket.writeUTF(JSON.stringify(msg));
                this.socket.flush();
            }

            this.callbacks[reqId] = cb;
        }
	}
}