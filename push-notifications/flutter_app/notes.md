# Brownbag script

## Introduction

Hi there. Today we're going to talk about Push notifications and Flutter.
Honestly, I doubt whether I choose the best title for this brownbag since we'll walk through some other stuff before
getting into the implementation.

## Agenda

This is our agenda.

We'll understand what is `Firebase Cloud Messaging` and how we set it up.
then we will demonstrate a really simples implementation using Flutter fire and flutter (duh)

We won't have a live coding here. The examples will be in a video
    - cause i do not like Android emulator

## Firebase Cloud Messaging

It's a messaging solution provided by Google (and Firebase) for sending messages to the clients. That's how Google let
you to send notifications to your app.

In the Firebase Console it will be under Engage category.
That makes sense since these notifications are useful for sending campaings to our users.

In the console we have a tool for sendind notifications where we can test and do someting different from thast image
(testing in production)

## Flutter fire to get it on flutter
how can we do that in flutter? We use the packages maintained by the Firebase team (https://firebase.flutter.dev/docs/messaging/notifications/#via-admin-sdks).

### Set up

### Demo app
We can see in this demo that our notifications are coming (with the default icon). we can tap on them and get the app
opened.

We can also see that we have kinda three variants of how the user interacts with a push notification.

onLaunch - when the app was not opened and got opened by notification, onResume - the app was in background and got
opened by the notificatrion, onMessage - foreground notifications

## Push notifications on Foregroung - using local notifications
The default behavior of these push notification is to not display anything on the screen ot even in the statusbar when
the app is in Foreground.

Usually, for messages we want to have in foreground we use InApp messaging that's a kind of category of messages in FCM

In this case, we would need to display the notifications by our own.

## NotificationHolder
To perform this foregound display I'd say we could have a dedicated widget. Three years ago I called it
NotificationHolder (not sure whether it's a good name).

The point of this widget is that it would just hold the stream for `onMessage` and display the notification using the
local_notification package.


## References
- https://developer.android.com/develop/ui/views/notifications
