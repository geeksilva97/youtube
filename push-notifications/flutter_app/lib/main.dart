import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'firebase_options.dart';
import 'dart:typed_data';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  final fcmToken = await FirebaseMessaging.instance.getToken();

  print('\n\nFCM token: $fcmToken\n\n');

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter + FCM',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter + FCM'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  String origin = '';
  var vibrationPattern = Int64List(4);
  final FlutterLocalNotificationsPlugin _flutterLocalNotificationsPlugin =
      FlutterLocalNotificationsPlugin();

  Future<void> setupInteractedMessage() async {
    // Get any messages which caused the application to open from
    // a terminated state.
    RemoteMessage? initialMessage =
        await FirebaseMessaging.instance.getInitialMessage();

    // If the message also contains a data property with a "type" of "chat",
    // navigate to a chat screen
    if (initialMessage != null) {
      setState(() {
        origin = 'onLaunch';
      });

      print('\nonLaunch - ${initialMessage.toMap()}\n\n');

      _handleMessage(initialMessage);
    }

    // Also handle any interaction when the app is in the background via a
    // Stream listener
    // is called when the app is in background
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      setState(() {
        origin = 'onResume';
      });

      print('\nonResume - ${message.toMap()}\n\n');
    });

    // Foreground notifications
    FirebaseMessaging.onMessage.listen((RemoteMessage message) async {
      setState(() {
        origin = 'Foreground message';
      });

      print('\nForeground message - ${message.toMap()}\n\n');

      var notification = message.notification;

      await _notifyMe(
        title: notification?.title ?? 'Any other title',
        body: notification?.body ?? 'any other body',
        payload: ''
      );
    });
  }

  void _handleMessage(RemoteMessage message) {
    print('Handling message - ${message.toMap()}');
  }

  @override
  void initState() {
    super.initState();

    // Run code required to handle interacted messages in an async function
    // as initState() must not be async
    setupInteractedMessage();
    _initializeNotifications();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(origin),
            ElevatedButton(
              child: const Text('Notify me'),
              onPressed: () {
                _notifyMe();
              }
            ),
            ElevatedButton(
              child: const Text('Reveal Token'),
              onPressed: () {
                _printToken();
              }
            ),
          ],
        ),
      )
    );
  }

  Future<void> _printToken() async {
    final fcmToken = await FirebaseMessaging.instance.getToken();

    print('\n\nFCM token: $fcmToken\n\n');
  }

  Future<void> _notifyMe(
      {String title = 'Title',
      String body = 'Body',
      String payload = 'Default payload'}) async {
    var androidPlatformChannelSpecifics = AndroidNotificationDetails(
        'high_importance_channel',
        'My really important channel',
        channelDescription: "If you love Dart so much, why don't marry it?",
        vibrationPattern: vibrationPattern,
        color: Colors.deepOrange,
        importance: Importance.max,
        priority: Priority.high,
        ticker: 'ticker');

    var platformChannelSpecifics = NotificationDetails(android: androidPlatformChannelSpecifics);

    await _flutterLocalNotificationsPlugin
        .show(0, title, body, platformChannelSpecifics, payload: payload);
  }

  _initializeNotifications() {
    const initializeSettingsAndroid =
        AndroidInitializationSettings('@mipmap/ic_launcher');

    var initializeSettings = InitializationSettings(android: initializeSettingsAndroid);

    _flutterLocalNotificationsPlugin.initialize(initializeSettings);
  }
}
