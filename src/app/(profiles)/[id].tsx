import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Avatar from "@/components/ui/avatar";
import BackButton from "@/components/ui/back-button";
import Button from "@/components/ui/button";
import { useUser } from "@/hooks/queries/use-user";
import { formatCount } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const {
    data: user,
    isLoading,
    isRefetching,
    refetch,
  } = useUser(id as string);

  const [isFollowing, setIsFollowing] = useState(false);

  if (isLoading || !user) {
    return (
      <ThemedView
        className="flex-1 items-center justify-center"
        style={{ paddingTop: insets.top }}
      >
        <ActivityIndicator size="large" color="#3b82f6" />
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1" style={{ paddingTop: insets.top }}>
      <View className="px-4 py-2 flex-row items-center border-b border-neutral-100 dark:border-neutral-900">
        <BackButton />
        <ThemedText type="smallBold" className="ml-2 text-lg">
          {user.username}
        </ThemedText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching && !isLoading}
            onRefresh={refetch}
          />
        }
      >
        <View className="flex-row items-center px-4 pt-4">
          <Avatar uri={user.avatarUrl} size={60} />

          <View className="flex-1 flex-row justify-around ml-4">
            <View className="items-center">
              <ThemedText type="smallBold" className="text-lg">
                {formatCount(user.stats?.postCount ?? 0)}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Posts
              </ThemedText>
            </View>
            <View className="items-center">
              <ThemedText type="smallBold" className="text-lg">
                {formatCount(user.stats?.followerCount ?? 0)}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Followers
              </ThemedText>
            </View>
            <View className="items-center">
              <ThemedText type="smallBold" className="text-lg">
                {formatCount(user.stats?.followingCount ?? 0)}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Following
              </ThemedText>
            </View>
          </View>
        </View>

        <View className="px-4 pt-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <View className="flex-row items-center">
            <ThemedText type="smallBold" className="text-[16px]">
              {user.fullName}
            </ThemedText>
            {user.isVerified && (
              <Ionicons
                name="checkmark-circle"
                color="#3b82f6"
                size={16}
                className="ml-1 mt-0.5"
              />
            )}
          </View>

          <ThemedText themeColor="textSecondary" className="mb-3">
            {user.username}
          </ThemedText>

          {!!user.bio && (
            <ThemedText className="text-[14px] leading-5 mb-3">
              {user.bio}
            </ThemedText>
          )}

          <View className="flex-row items-center flex-wrap gap-y-2 mb-4">
            {!!user.location && (
              <View className="flex-row items-center mr-4">
                <Ionicons name="location-outline" size={16} color="#737373" />
                <ThemedText
                  type="small"
                  themeColor="textSecondary"
                  className="ml-1"
                >
                  {user.location}
                </ThemedText>
              </View>
            )}

            {!!user.website && (
              <View className="flex-row items-center">
                <Ionicons name="link-outline" size={16} color="#737373" />
                <ThemedText type="small" className="ml-1 text-blue-500">
                  {user.website.replace(/^https?:\/\//, "")}{" "}
                </ThemedText>
              </View>
            )}
          </View>

          <Button
            onPress={() => setIsFollowing(!isFollowing)}
            customClassName={
              isFollowing ? "bg-neutral-200 dark:bg-neutral-800" : "bg-blue-500"
            }
          >
            <ThemedText
              type="smallBold"
              style={!isFollowing ? { color: "#ffffff" } : undefined}
            >
              {isFollowing ? "Following" : "Follow"}
            </ThemedText>
          </Button>
        </View>

        {/* User's Posts Feed (Placeholder) */}
        <View className="py-8 items-center">
          <ThemedText themeColor="textSecondary">
            Posts will appear here.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
