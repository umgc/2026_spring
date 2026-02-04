/// Represents a single course in the learning system
class Course {
  final String id;
  final String title;
  final String instructor;
  final String description;
  final int totalLessons;
  final int completedLessons;
  final String category;
  final double rating;
  final DateTime createdAt;
  final DateTime? completedAt;

  const Course({
    required this.id,
    required this.title,
    required this.instructor,
    required this.description,
    required this.totalLessons,
    required this.completedLessons,
    required this.category,
    required this.rating,
    required this.createdAt,
    this.completedAt,
  });

  /// Returns the progress percentage (0-100)
  int get progressPercentage {
    if (totalLessons == 0) return 0;
    return ((completedLessons / totalLessons) * 100).round();
  }

  /// Returns true if the course is completed
  bool get isCompleted => completedLessons == totalLessons;

  /// Returns the number of remaining lessons
  int get remainingLessons => totalLessons - completedLessons;

  /// Returns true if the course is started but not completed
  bool get isInProgress => completedLessons > 0 && !isCompleted;

  /// Returns true if rating is above 4.0
  bool get isHighRated => rating >= 4.0;

  Course copyWith({
    String? id,
    String? title,
    String? instructor,
    String? description,
    int? totalLessons,
    int? completedLessons,
    String? category,
    double? rating,
    DateTime? createdAt,
    DateTime? completedAt,
  }) {
    return Course(
      id: id ?? this.id,
      title: title ?? this.title,
      instructor: instructor ?? this.instructor,
      description: description ?? this.description,
      totalLessons: totalLessons ?? this.totalLessons,
      completedLessons: completedLessons ?? this.completedLessons,
      category: category ?? this.category,
      rating: rating ?? this.rating,
      createdAt: createdAt ?? this.createdAt,
      completedAt: completedAt ?? this.completedAt,
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Course &&
        other.id == id &&
        other.title == title &&
        other.instructor == instructor &&
        other.description == description &&
        other.totalLessons == totalLessons &&
        other.completedLessons == completedLessons &&
        other.category == category &&
        other.rating == rating &&
        other.createdAt == createdAt &&
        other.completedAt == completedAt;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        title.hashCode ^
        instructor.hashCode ^
        description.hashCode ^
        totalLessons.hashCode ^
        completedLessons.hashCode ^
        category.hashCode ^
        rating.hashCode ^
        createdAt.hashCode ^
        completedAt.hashCode;
  }

  @override
  String toString() => 'Course(id: $id, title: $title, progress: $progressPercentage%)';
}
