# gwt-webworker
WebWorker classes from Googles SpeedTracer extracted as own package to integrate in own projects.

Maven integraten
----------------

The dependency itself for GWT-Projects:

```
    <dependency>
      <groupId>de.knightsoft-net</groupId>
      <artifactId>gwt-webworker</artifactId>
      <version>1.0.4</version>
```

GWT Integration
---------------

The project using web workers mustn't compile different permutations, because inside
a web worker the browser or language version can't be detected. So separate the web worker
from the rest of your application.

What you now have to insert into your .gwt.xml file is:

```
<inherits name='com.google.gwt.webworker.WebWorker' />

<set-property name="user.agent" value="safari" />
<set-configuration-property name="user.agent.runtimeWarning" value="false" />

<!-- Use the WebWorker linker for a Dedicated worker -->
<add-linker name="dedicatedworker" />
```

Now you can implement your Web Worker class which has to extend DedicatedWorkerEntryPoint
and implement MessageHandler. With postMessage(String) the Web Worker can send Messages to
the calling application and the onMessage(MessageEvent) method receives messages sent by the
application.

On application side you have to create one Error Handler and Message Handler to receive 
Messages from the worker. Now you can create a Web Worker thread and post messages to him.
If you create more workers at the same time, you can use multithreading and take profit of
Multicore CPUs even in the browser.

```
final ErrorHandler webWorkerErrorHandler = new ErrorHandler() {
  @Override
  public void onError(final ErrorEvent pEvent) {
    // handle error
  }
}

final MessageHandler webWorkerMessageHandler = new MessageHandler() {
  @Override
  public final void onMessage(final MessageEvent pEvent) {
    // handle message
  }
}
..

Worker worker = Worker.create(<javascriptname>)
worker.setOnMessage(webWorkerMessageHandler);
worker.setOnError(webWorkerErrorHandler);

worker.postMessage("(may be serialized) data to handle in web worker");
```
That's all.