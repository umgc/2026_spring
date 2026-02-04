/// Represents a scheduled learning event
class ScheduleEvent {
  final String id;
  final String title;
  final String description;
  final DateTime startTime;
  final DateTime endTime;
  final String location;
  final String eventType; // 'lesson', 'assignment', 'quiz', 'discussion'
  final bool isCompleted;
  final String courseId;

  const ScheduleEvent({
    required this.id,
    required this.title,
    required this.description,
    required this.startTime,
    required this.endTime,
    required this.location,
    required this.eventType,
    required this.isCompleted,
    required this.courseId,
  });

  /// Returns the duration in minutes
  int get durationMinutes {
    return endTime.difference(startTime).inMinutes;
  }

  /// Returns true if the event is happening now
  bool get isHappening {
    final now = DateTime.now();
    return startTime.isBefore(now) && endTime.isAfter(now);
  }

  /// Returns true if the event is in the future
  bool get isUpcoming {
    return startTime.isAfter(DateTime.now());
  }

  /// Returns true if the event is in the past
  bool get isPast {
    return endTime.isBefore(DateTime.now());
  }

  /// Returns minutes until the event starts (negative if in past)
  int get minutesUntilStart {
    return startTime.difference(DateTime.now()).inMinutes;
  }

  ScheduleEvent copyWith({
    String? id,
    String? title,
    String? description,
    DateTime? startTime,
    DateTime? endTime,
    String? location,
    String? eventType,
    bool? isCompleted,
    String? courseId,
  }) {
    return ScheduleEvent(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      startTime: startTime ?? this.startTime,
      endTime: endTime ?? this.endTime,
      location: location ?? this.location,
      eventType: eventType ?? this.eventType,
      isCompleted: isCompleted ?? this.isCompleted,
      courseId: courseId ?? this.courseId,
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is ScheduleEvent &&
        other.id == id &&
        other.title == title &&
        other.description == description &&
        other.startTime == startTime &&
        other.endTime == endTime &&
        other.location == location &&
        other.eventType == eventType &&
        other.isCompleted == isCompleted &&
        other.courseId == courseId;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        title.hashCode ^
        description.hashCode ^
        startTime.hashCode ^
        endTime.hashCode ^
        location.hashCode ^
        eventType.hashCode ^
        isCompleted.hashCode ^
        courseId.hashCode;
  }

  @override
  String toString() => 'ScheduleEvent(id: $id, title: $title, duration: $durationMinutes minutes)';
}
