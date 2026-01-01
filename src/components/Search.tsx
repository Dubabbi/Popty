import { Search as SearchIcon, X, MapPin, Calendar, Heart } from "lucide-react";
import { useState } from "react";
import type { ViewType } from "../routes/routes";

interface SearchProps {
  onNavigate: (view: ViewType, popupId?: string) => void;
  breakpoint: "mobile" | "tablet" | "desktop";
}

interface PopupResult {
  id: string;
  title: string;
  location: string;
  date: string;
  category: string;
  image: string;
  isSaved: boolean;
}

const popularSearches = [
  "가나디 팝업",
  "성수 가나디 팝업",
  "잠실 롯데월드몰 팝업",
  "망그러진 곰",
  "팝업스토어",
  "팝업스토어",
  "팝업스토어",
  "팝업스토어",
  "팝업스토어",
  "팝업스토어",
];

const recentlyViewedPopups = [
  {
    id: "1",
    title: "가나디 팝업",
    image:
      "https://images.unsplash.com/photo-1706282540364-962e8b1543da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFic3RyYWN0JTIwYXJ0JTIwcG9zdGVyfGVufDF8fHx8MTc2NzE2MDAxOHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "2",
    title: "성수 가나디 팝업",
    image:
      "https://images.unsplash.com/photo-1723283126758-28f2a308bc47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWJyYW50JTIwZ2VvbWV0cmljJTIwcGF0dGVybnxlbnwxfHx8fDE3NjcxNjY4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "3",
    title: "잠실 롯데월드몰 팝업",
    image:
      "https://images.unsplash.com/photo-1679294176201-f9b302961f42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwdXJiYW4lMjBuaWdodHxlbnwxfHx8fDE3NjcwNDIyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const mockResults: PopupResult[] = [
  {
    id: "1",
    title: "Sanrio Cafe",
    location: "Seongsu, Seoul",
    date: "Dec 20 - Feb 15",
    category: "Cafe & Food",
    image:
      "https://images.unsplash.com/photo-1706282540364-962e8b1543da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFic3RyYWN0JTIwYXJ0JTIwcG9zdGVyfGVufDF8fHx8MTc2NzE2MDAxOHww&ixlib=rb-4.1.0&q=80&w=1080",
    isSaved: false,
  },
  {
    id: "2",
    title: "BTS Pop-up Store",
    location: "Gangnam, Seoul",
    date: "Jan 1 - Jan 31",
    category: "K-pop & Entertainment",
    image:
      "https://images.unsplash.com/photo-1723283126758-28f2a308bc47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWJyYW50JTIwZ2VvbWV0cmljJTIwcGF0dGVybnxlbnwxfHx8fDE3NjcxNjY4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isSaved: true,
  },
  {
    id: "3",
    title: "Nike Sneaker Lab",
    location: "Hongdae, Seoul",
    date: "Jan 5 - Mar 5",
    category: "Fashion & Lifestyle",
    image:
      "https://images.unsplash.com/photo-1679294176201-f9b302961f42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwdXJiYW4lMjBuaWdodHxlbnwxfHx8fDE3NjcwNDIyNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isSaved: false,
  },
  {
    id: "4",
    title: "Harry Potter Exhibition",
    location: "Gangnam, Seoul",
    date: "Dec 15 - Feb 28",
    category: "Art & Design",
    image:
      "https://images.unsplash.com/photo-1714972692832-618fae83ef30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBncmFkaWVudCUyMG1vZGVybnxlbnwxfHx8fDE3NjcxNjY4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isSaved: true,
  },
  {
    id: "5",
    title: "Pokemon Center",
    location: "Myeongdong, Seoul",
    date: "Jan 10 - Apr 10",
    category: "Anime & Games",
    image:
      "https://images.unsplash.com/photo-1686405585580-2a1f5aac9837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMGNvbG9yZnVsJTIwcGFpbnR8ZW58MXx8fHwxNjcxNjY4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isSaved: false,
  },
];

export function Search({ onNavigate }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<PopupResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [savedItems, setSavedItems] = useState<Set<string>>(
    new Set(mockResults.filter((r) => r.isSaved).map((r) => r.id)),
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim().length > 0) {
      setIsSearching(true);
      setTimeout(() => {
        const filtered = mockResults.filter(
          (result) =>
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.category.toLowerCase().includes(query.toLowerCase()) ||
            result.location.toLowerCase().includes(query.toLowerCase()),
        );
        setResults(filtered);
        setIsSearching(false);
      }, 300);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setResults([]);
    setIsSearching(false);
  };

  const handleQuickSearch = (query: string) => {
    handleSearch(query);
  };

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const showEmptyState = searchQuery.length === 0;
  const showNoResults =
    searchQuery.length > 0 && results.length === 0 && !isSearching;

  return (
    <div style={{ background: "white", padding: "var(--space-4)" }}>
      <div
        style={{
          position: "relative",
          marginBottom: "var(--space-6)",
        }}
      >
        <SearchIcon
          size={20}
          color="var(--color-text-tertiary)"
          style={{
            position: "absolute",
            left: 18,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        />
        <input
          type="text"
          placeholder="Search pop-ups or categories!"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          autoFocus
          style={{
            width: "100%",
            padding: "14px 48px 14px 52px",
            borderRadius: "28px",
            border: "none",
            background: "var(--color-gray-100)",
            fontSize: "0.9375rem",
            outline: "none",
            color: "var(--color-text-primary)",
          }}
        />
        {searchQuery.length > 0 && (
          <button
            onClick={handleClearSearch}
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "var(--color-gray-400)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            <X size={14} color="white" />
          </button>
        )}
      </div>

      {/* Empty State - Recent & Popular */}
      {showEmptyState && (
        <>
          {/* Recent Searches */}
          <div style={{ marginBottom: "var(--space-6)" }}>
            <h2
              style={{
                margin: 0,
                marginBottom: "var(--space-3)",
                fontSize: "1.125rem",
              }}
            >
              최근 검색어
            </h2>
            <p
              style={{
                margin: 0,
                color: "var(--color-text-tertiary)",
                fontSize: "0.9375rem",
              }}
            >
              No recent search history.
            </p>
          </div>

          {/* Popular Searches */}
          <div style={{ marginBottom: "var(--space-6)" }}>
            <h2
              style={{
                margin: 0,
                marginBottom: "var(--space-4)",
                fontSize: "1.125rem",
              }}
            >
              인기 검색어
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-4)",
              }}
            >
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickSearch(search)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "var(--space-2)",
                  }}
                >
                  <span
                    style={{
                      color:
                        index < 3
                          ? "var(--color-primary)"
                          : "var(--color-text-tertiary)",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      minWidth: "16px",
                    }}
                  >
                    {index + 1}
                  </span>
                  <span
                    style={{
                      color: "var(--color-text-primary)",
                      fontSize: "0.9375rem",
                      flex: 1,
                    }}
                  >
                    {search}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Recently Viewed Popups */}
          <div>
            <h2
              style={{
                margin: 0,
                marginBottom: "var(--space-4)",
                fontSize: "1.125rem",
              }}
            >
              Recently Viewed Pop-ups
            </h2>
            <div
              style={{
                display: "flex",
                gap: "var(--space-3)",
                overflowX: "auto",
                paddingBottom: "var(--space-2)",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>
                {`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
              {recentlyViewedPopups.map((popup) => (
                <div
                  key={popup.id}
                  onClick={() => onNavigate("detail", popup.id)}
                  style={{
                    minWidth: "140px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "140px",
                      height: "200px",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                      background: "var(--color-gray-200)",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    <img
                      src={popup.image}
                      alt={popup.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.875rem",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {popup.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Loading State */}
      {isSearching && (
        <div
          style={{
            background: "white",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-8)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              margin: "0 auto",
              border: "3px solid var(--color-gray-200)",
              borderTopColor: "var(--color-primary)",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <style>
            {`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}
          </style>
          <p
            style={{
              margin: "var(--space-4) 0 0",
              color: "var(--color-text-tertiary)",
            }}
          >
            Searching...
          </p>
        </div>
      )}

      {/* No Results */}
      {showNoResults && (
        <div
          style={{
            background: "white",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-8)",
            textAlign: "center",
          }}
        >
          <SearchIcon
            size={48}
            color="var(--color-gray-300)"
            style={{ margin: "0 auto var(--space-4)" }}
          />
          <h3
            style={{
              margin: 0,
              marginBottom: "var(--space-2)",
              color: "var(--color-text-secondary)",
            }}
          >
            No results found
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "var(--color-text-tertiary)",
            }}
          >
            Try different keywords or browse popular searches
          </p>
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && !isSearching && (
        <>
          <div style={{ marginBottom: "var(--space-4)" }}>
            <p
              style={{
                margin: 0,
                color: "var(--color-text-tertiary)",
                fontSize: "0.875rem",
              }}
            >
              {results.length} {results.length === 1 ? "result" : "results"} for
              "{searchQuery}"
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            {results.map((result) => (
              <div
                key={result.id}
                onClick={() => onNavigate("detail", result.id)}
                style={{
                  background: "white",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  border: "1px solid var(--color-gray-200)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", gap: "var(--space-3)" }}>
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      flexShrink: 0,
                      background: "var(--color-gray-200)",
                      position: "relative",
                    }}
                  >
                    <img
                      src={result.image}
                      alt={result.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      flex: 1,
                      padding: "var(--space-3) var(--space-3) var(--space-3) 0",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          marginBottom: "var(--space-2)",
                        }}
                      >
                        <h3
                          style={{ margin: 0, marginBottom: "var(--space-1)" }}
                        >
                          {result.title}
                        </h3>
                        <button
                          onClick={(e) => toggleSave(result.id, e)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 4,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Heart
                            size={20}
                            color={
                              savedItems.has(result.id)
                                ? "var(--color-error)"
                                : "var(--color-text-tertiary)"
                            }
                            fill={
                              savedItems.has(result.id)
                                ? "var(--color-error)"
                                : "none"
                            }
                          />
                        </button>
                      </div>

                      <div
                        style={{
                          display: "inline-block",
                          padding: "4px 10px",
                          borderRadius: "var(--radius-full)",
                          background: "var(--color-primary-bg)",
                          color: "var(--color-primary)",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          marginBottom: "var(--space-2)",
                        }}
                      >
                        {result.category}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--space-1)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--space-2)",
                        }}
                      >
                        <MapPin size={14} color="var(--color-text-tertiary)" />
                        <span
                          style={{
                            fontSize: "0.8125rem",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {result.location}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--space-2)",
                        }}
                      >
                        <Calendar
                          size={14}
                          color="var(--color-text-tertiary)"
                        />
                        <span
                          style={{
                            fontSize: "0.8125rem",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {result.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
